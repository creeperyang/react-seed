import { resolve, join } from 'path';
import autoprefixer from 'autoprefixer';
import webpack from 'webpack';
import { plugins, loaders } from './webpack.loadersAndPlugins';
import { DEBUG, HOST, PORT, APP_PATH, BUILD_PATH, BUILD_SCRIPT_DIR } from '../config';

const config = {
    entry: {
        app: DEBUG ? [`webpack-dev-server/client?http://${HOST}:${PORT}`, 'webpack/hot/dev-server', resolve(APP_PATH, 'app.js')] : resolve(APP_PATH, 'app.js'),
        vendors: ['react', 'react-dom', 'react-router']
    },
    output: {
        path: BUILD_PATH,
        filename: `${BUILD_SCRIPT_DIR ? BUILD_SCRIPT_DIR : '.'}/[name].[hash:5].js`,
        chunkFilename: `${BUILD_SCRIPT_DIR ? BUILD_SCRIPT_DIR : '.'}script/[id].bundle.js`
    },
    devtool: DEBUG ? 'eval-source-map' : false,
    plugins: plugins,
    target: 'web',
    module: {
        preLoaders: [
            {test: /\.js$/, loader: 'eslint-loader', exclude: /node_modules/}
        ],
        loaders: loaders
    },
    postcss: [autoprefixer({ browsers: ['last 2 versions'] })],
    devServer: {
        contentBase: BUILD_PATH,
        hot: true,
        noInfo: false,
        inline: true,
        stats: {
            colors: true
        }
    },
    stats: {
        colors: true
    }
};

export default config;
