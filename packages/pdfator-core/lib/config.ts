import { join, sep } from 'path';

const localChromePath = join('headless-chromium.zip');

const setupChromePath = join(sep, 'tmp');
const executablePath = join(setupChromePath, 'headless-chromium');

const DEBUG = !!process.env.DEBUG;
const WITH_LOCAL_CHROME = !!process.env.LOCAL_CHROME;
export {
  localChromePath,
  setupChromePath,
  executablePath,
  DEBUG,
  WITH_LOCAL_CHROME
};
