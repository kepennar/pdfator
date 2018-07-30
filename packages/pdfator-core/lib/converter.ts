import { debug } from './Logger';
import { IConverterConfig, PDFatorFormat } from './pdfator.model';
import { getBrowser } from './setup';
import { getFormatFromFilename } from './config';

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
  const convertionFormat = getFormatFromFilename(outputFile);

  debug('Start convertion with config', config);
  let result: Buffer;
  if (convertionFormat === PDFatorFormat.PDF) {
    result = await page.pdf({
      ...config,
      format,
      printBackground: true,
      scale: 0.78,
      margin: { top: '0', right: '0', bottom: '0', left: '0' }
    });
  } else if (convertionFormat === PDFatorFormat.PNG) {
    result = await page.screenshot({ ...config, fullPage: true });
  } else {
    throw new Error(`Unsupported format ${convertionFormat}`);
  }
  debug('result', result);

  await browser.close();
  debug({ result });
  return result;
}
