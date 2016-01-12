import webpack from 'webpack';
import { resolve, join } from 'path';
import HtmlwebpackPlugin from 'html-webpack-plugin';
import ExtractTextPlugin from 'extract-text-webpack-plugin';

const DEBUG = process.env.NODE_ENV === 'development';

const ROOT_PATH = process.cwd();
const APP_PATH = resolve(ROOT_PATH, 'app');
const BUILD_PATH = resolve(ROOT_PATH, 'build');

///
/// loaders
///
let sassLoader, cssLoader, jsLoader;

/// ----style loaders---
const sassParams = [
    'outputStyle=expanded',
    'includePaths[]=' + resolve(ROOT_PATH, 'app/style'),
    'includePaths[]=' + resolve(ROOT_PATH, 'node_modules')
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

/// ----js loader---
jsLoader = ['babel?presets[]=react,presets[]=es2015,presets[]=stage-0'].join('!');

const loaders = [
        {
            test: /\.css$/,
            loader: cssLoader,
            include: APP_PATH
        }, {
            test: /\.jsx?$/,
            loader: jsLoader,
            include: APP_PATH,
            exclude: /(node_modules|bower_components)/
        }, {
            test: /\.scss$/,
            loader: sassLoader
        }, {
            test: /\.jpe?g$|\.gif$|\.png$|\.ico|\.svg$|\.woff$|\.ttf$/,
            loader: 'file-loader?name=[path][name].[ext]'
        }
    ];

///
/// plugins
///

// extracted css file name
const cssBundle = join('css', '[name].[hash:5].css');
const plugins = [
        new HtmlwebpackPlugin({
            title: 'Demo',
            filename: 'index.html',
            inject: 'body',
            template: resolve(APP_PATH, 'index.html')
        }),
        new ExtractTextPlugin(cssBundle, {
            allChunks: true
        }),
        new webpack.optimize.OccurenceOrderPlugin(),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoErrorsPlugin()
    ];

export { loaders, plugins };
