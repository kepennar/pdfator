import { debug } from './Logger';
import { IConverterConfig, PDFATOR_FORMATS } from './pdfator.model';
import { getBrowser } from './setup';

export async function convert({
  url,
  outputFile,
  size,
  flushToDisk,
  extension
}: IConverterConfig) {
  debug('Attempt to get browser');

  const browser = await getBrowser();
  const page = await browser.newPage();
  await page.emulateMedia('screen');
  await page.goto(url, { waitUntil: 'networkidle2' });
  debug('Page gone to', url);

  const formatConfig = PDFATOR_FORMATS[extension];

  const config = {
    path: flushToDisk ? `${outputFile}${formatConfig.extension}` : undefined
  };
  debug('Start convertion with config', config);
  let result: Buffer;
  if (extension === 'PDF') {
    result = await page.pdf({
      ...config,
      format: size,
      printBackground: true,
      scale: 0.78,
      margin: { top: '0', right: '0', bottom: '0', left: '0' }
    });
  } else if (extension === 'PNG') {
    result = await page.screenshot({ ...config, fullPage: true });
  } else {
    throw new Error(`Unsupported format ${extension}`);
  }
  debug('result', result);

  await browser.close();
  debug({ result });
  return result;
}
