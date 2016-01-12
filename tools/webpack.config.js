import webpack from 'webpack';
import { resolve, join } from 'path';
import { plugins, loaders } from './webpack.loadersAndPlugins';
import autoprefixer from 'autoprefixer-core';

const DEBUG = process.env.NODE_ENV === 'development';

const ROOT_PATH = process.cwd();
const APP_PATH = resolve(ROOT_PATH, 'app');
const BUILD_PATH = resolve(ROOT_PATH, 'build');

const config = {
    entry: {
        app: ['webpack-dev-server/client?http://localhost:3000', 'webpack/hot/dev-server', resolve(APP_PATH, 'app.js')]
    },
    output: {
        path: BUILD_PATH,
        filename: 'script/[name].[hash].js',
        chunkFilename: "script/[id].bundle.js"
    },
    plugins: plugins,
    target: 'web',
    module: {
        loaders: loaders
    },
    postcss: [autoprefixer],
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
