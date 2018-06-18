import { createReadStream } from 'fs';
import { Extract } from 'unzip';
import * as puppeteer from 'puppeteer';

import {
  localChromePath,
  setupChromePath,
  executablePath,
  DEBUG
} from './config';

exports.getBrowser = (() => {
  let browser: puppeteer.Browser;
  return async () => {
    if (
      typeof browser === 'undefined' ||
      !(await isBrowserAvailable(browser))
    ) {
      await setupLocalChrome();
      browser = await puppeteer.launch({
        headless: true,
        executablePath,
        args: [
          // error when launch(); No usable sandbox! Update your kernel
          '--no-sandbox',
          // error when launch(); Failed to load libosmesa.so
          '--disable-gpu',
          // freeze when newPage()
          '--single-process'
        ],
        dumpio: DEBUG
      });
      const browserVersion = await browser.version();
      console.log(`launch done: ${browserVersion}`);
    }
    return browser;
  };
})();

const isBrowserAvailable = async (browser: puppeteer.Browser) => {
  try {
    await browser.version();
  } catch (e) {
    console.log(e); // not opened etc.
    return false;
  }
  return true;
};

const setupLocalChrome = () => {
  return new Promise((resolve, reject) => {
    createReadStream(localChromePath)
      .pipe(Extract({ path: setupChromePath }))
      .on('error', err => reject(err))
      .on('end', () => resolve());
  });
};
