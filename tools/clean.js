import del from 'del';
import task from './lib/task';

const clean = async () => {
    await del(['build/*', '!build/.git'], { dot: true });
};

export default task(clean);
