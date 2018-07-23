import { extname } from 'path';
import * as puppeteer from 'puppeteer';

import { getBrowser } from './setup';
import { DEBUG } from './config';
import { debug } from './Logger';

export interface IConverterConfig {
  url: string;
  outputFile: string;
  format: puppeteer.PDFFormat;
  flushToDisk: boolean;
}

export enum PDFatorFormat {
  PDF = 'application/pdf',
  PNG = 'image/png'
}

export async function convert({
  url,
  outputFile,
  format,
  flushToDisk
}: IConverterConfig) {
  debug('Attempt to get browser');

  const browser = await getBrowser();
  const page = await browser.newPage();
  await page.emulateMedia('screen');
  await page.goto(url, { waitUntil: 'networkidle2' });
  debug('Page gone to', url);

  const config = {
    path: flushToDisk ? outputFile : undefined
  };
  const desiredOutput = extname(outputFile);

  debug('before convert', config);

  let result: Buffer;
  if (desiredOutput === '.pdf') {
    result = await page.pdf({
      ...config,
      format,
      printBackground: true,
      scale: 0.78,
      margin: { top: '0', right: '0', bottom: '0', left: '0' }
    });
  } else if (desiredOutput === '.png') {
    result = await page.screenshot({ ...config, fullPage: true });
  } else {
    throw new Error(`Unsupported format ${desiredOutput}`);
  }
  debug('result', result);

  await browser.close();
  debug({ DEBUG });
  debug({ result });
  return result;
}

export function getFormatFromFilename(filename: string): PDFatorFormat {
  const ext = extname(filename);
  return ext === '.png' ? PDFatorFormat.PNG : PDFatorFormat.PDF;
}
