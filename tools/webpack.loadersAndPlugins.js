import { resolve, join } from 'path';
import webpack from 'webpack';
import HtmlwebpackPlugin from 'html-webpack-plugin';
import ExtractTextPlugin from 'extract-text-webpack-plugin';
import { DEBUG, APP_PATH, BUILD_SCRIPT_DIR, BUILD_STYLE_DIR, BUILD_RES_DIR, BUILD_IMAGE_DIR, NODE_MODULES_PATH, HTML_SETTING } from '../config';

///
/// loaders
///
let sassLoader, cssLoader, jsLoader, imgLoader;

/// ----style loaders---
const sassParams = [
    'outputStyle=expanded',
    'includePaths[]=' + APP_PATH,
    'includePaths[]=' + NODE_MODULES_PATH
];

if (DEBUG) {
    sassParams.push('sourceMap', 'sourceMapContents=true');
    sassLoader = [
        'style-loader',
        'css-loader?sourceMap&modules&localIdentName=[name]__[local]___[hash:base64:5]',
        'postcss-loader',
        'sass-loader?' + sassParams.join('&')
    ].join('!');
    cssLoader = [
        'style-loader',
        'css-loader?sourceMap&modules&localIdentName=[name]__[local]___[hash:base64:5]',
        'postcss-loader'
    ].join('!');
} else {
    sassLoader = ExtractTextPlugin.extract('style-loader', [
        'css-loader?modules&localIdentName=[hash:base64:5]',
        'postcss-loader',
        'sass-loader?' + sassParams.join('&')
    ].join('!'));
    cssLoader = ExtractTextPlugin.extract('style-loader', [
        'css-loader?modules&localIdentName=[hash:base64:5]',
        'postcss-loader'
    ].join('!'));
}

// special sass loader, disable css module
const specialSassLoader = sassLoader.replace(/!css-loader[^!]+!/, '!css-loader?sourceMap&-modules!');

/// ----file loader----
imgLoader = [`url-loader?name=${BUILD_IMAGE_DIR + '/'}[name].[ext]&limit=1024`].join('!');

const loaders = [{
    test: /app\/styles\/\S+\.scss$/,
    loader: specialSassLoader
}, {
    test: /\.css$/,
    loader: cssLoader,
    include: APP_PATH
}, {
    test: /\.scss$/,
    exclude: /app\/styles\/\S+\.scss$/,
    loader: sassLoader
}, {
    test: /\.jsx?$/,
    loader: ['babel'],
    include: APP_PATH,
    exclude: /(node_modules|bower_components)/,
    query: {
        presets: ['react', 'es2015', 'stage-0'],
        plugins: DEBUG ? [['react-transform', {
            transforms: [{
                transform: 'react-transform-hmr',
                imports: ['react'],
                locals: ['module']
            }, {
                transform: 'react-transform-catch-errors',
                imports: ['react', 'redbox-react']
            }]
        }]] : [],
        babelrc: false
    }
}, {
    test: /\.woff$/,
    loader: `url?name=${BUILD_RES_DIR + '/'}[name].[ext]&limit=10000&mimetype=application/font-woff`
}, {
    test: /\.woff2$/,
    loader: `url?name=${BUILD_RES_DIR + '/'}[name].[ext]&limit=10000&mimetype=application/font-woff`
}, {
    test: /\.ttf$/,
    loader: `url?name=${BUILD_RES_DIR + '/'}[name].[ext]&limit=10000&mimetype=application/octet-stream`
}, {
    test: /\.eot$/,
    loader: `file?name=${BUILD_RES_DIR + '/'}[name].[ext]`
}, {
    test: /\.svg$/,
    loader: `url?name=${BUILD_RES_DIR + '/'}[name].[ext]&limit=10000&mimetype=image/svg+xml`
}, {
    test: /\.jpe?g$|\.gif$|\.png$|\.ico$/,
    loader: imgLoader
}
];

///
/// plugins
///

// extracted css file name
const cssBundle = join(BUILD_STYLE_DIR, '[name].[hash:5].css');
const plugins = [
    new webpack.optimize.CommonsChunkPlugin('vendors', join(BUILD_SCRIPT_DIR, 'vendors.js')),
    new HtmlwebpackPlugin({
        title: HTML_SETTING.title,
        filename: HTML_SETTING.filename,
        inject: 'body',
        template: HTML_SETTING.template
    }),
    new ExtractTextPlugin(cssBundle, {
        allChunks: true
    }),
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin()
];
if (!DEBUG) {
    plugins.unshift(new webpack.optimize.UglifyJsPlugin({ minimize: true }));
}

export { loaders, plugins };
