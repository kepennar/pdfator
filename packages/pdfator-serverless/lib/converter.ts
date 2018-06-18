import * as puppeteer from 'puppeteer';
import { extname } from 'path';

export interface IConverterConfig {
  url: string;
  outputFile: string;
  format: puppeteer.PDFFormat;
}

export async function convert({ url, outputFile, format }: IConverterConfig) {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.emulateMedia('screen');
  await page.goto(url, { waitUntil: 'networkidle2' });

  const config = {
    path: outputFile
  };
  const desiredOutput = extname(outputFile);
  if (desiredOutput === '.pdf') {
    await page.pdf({
      ...config,
      format,
      printBackground: true,
      scale: 0.78,
      margin: { top: '0', right: '0', bottom: '0', left: '0' }
    });
  } else if (desiredOutput === '.png') {
    await page.screenshot({ ...config, fullPage: true });
  }

  await browser.close();
}
