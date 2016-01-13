import webpack from 'webpack';
import WebpackDevServer from 'webpack-dev-server';
import opn from 'opn';
import config from './webpack.config';
import { HOST, PORT } from '../config';

const compiler = webpack(config);
const server = new WebpackDevServer(
    compiler,
    config.devServer
);

server.listen(PORT, HOST, function(err) {
    if (err) {
        console.log(err);
        return;
    }
    const url = `http://${HOST}:${PORT}`;
    console.log('Listening at %s', url);
    opn(url);
});
