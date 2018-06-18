import { join, sep } from 'path';

const localChromePath = join('headless_chromium.zip');

const setupChromePath = join(sep, 'tmp');
const executablePath = join(setupChromePath, 'headless_shell');

const DEBUG = !!process.env.DEBUG;
export { localChromePath, setupChromePath, executablePath, DEBUG };
