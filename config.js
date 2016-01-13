import { resolve } from 'path';

/// env
const DEBUG = process.env.NODE_ENV === 'development';

/// dev server
const HOST = 'localhost';
const PORT = 3000;

/// app and build setting
const ROOT_PATH = process.cwd();
const NODE_MODULES_PATH = resolve(ROOT_PATH, 'node_modules');
const APP_PATH = resolve(ROOT_PATH, 'app');

const BUILD_PATH = resolve(ROOT_PATH, 'build');
// set to empty string if you want to place js/css/ohter static file into build dir directly
const BUILD_SCRIPT_DIR = 'scripts';
const BUILD_STYLE_DIR = 'styles';
const BUILD_IMAGE_DIR = 'images';
const BUILD_RES_DIR = 'res';


export { DEBUG, HOST, PORT, APP_PATH, BUILD_PATH, BUILD_SCRIPT_DIR, BUILD_IMAGE_DIR, BUILD_STYLE_DIR, BUILD_RES_DIR };
