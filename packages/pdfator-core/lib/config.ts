import { join, sep } from 'path';

export const localChromePath = join('headless-chromium.zip');
export const setupChromePath = join(sep, 'tmp');
export const executablePath = join(setupChromePath, 'headless-chromium');

export const DEBUG = !!process.env.DEBUG;
export const WITH_LOCAL_CHROME = !!process.env.LOCAL_CHROME;
