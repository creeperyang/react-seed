import webpack from 'webpack';
import WebpackDevServer from 'webpack-dev-server';
import opn from 'opn';
import config from './webpack.config';

const compiler = webpack(config);
const server = new WebpackDevServer(
    compiler,
    config.devServer
);

server.listen(3000, '0.0.0.0', function(err) {
    if (err) {
        console.log(err);
        return;
    }
    const url = 'http://0.0.0.0:3000';
    console.log('Listening at %s', url);
    opn(url);
});
