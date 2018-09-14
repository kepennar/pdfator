import { join, sep } from 'path';

export const localChromePath = join('headless-chromium.zip');
export const setupChromePath = join(sep, 'tmp');
export const executablePath = join(setupChromePath, 'headless-chromium');

export const DEBUG = !!process.env.DEBUG;
export const WITH_LOCAL_CHROME = !!process.env.LOCAL_CHROME;

export const LOADING_TIMEOUT = 10000;
export const MOBILE_USERAGENT =
  'Mozilla/5.0 (Linux; Android 8.1.0; Nokia 6.1 Build/OPR1.170623.026; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/66.0.3359.158 Mobile Safari/537.36';

export const MOBILE_DIMENSION = {
  width: 455,
  height: 809
};
