import webpack from 'webpack';
import config from './webpack.config';
import task from './lib/task';

export default task(function compile() {
    return new Promise((resolve, reject) => {
        const bundler = webpack(config);
        const run = (err, stats) => {
            if (err) {
                reject(err);
            } else {
                console.log(stats.toString(config.stats));
                resolve();
            }
        };
        bundler.run(run);
    });
});
