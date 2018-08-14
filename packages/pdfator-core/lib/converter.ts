import { debug } from './Logger';
import { IConverterConfig, PDFATOR_FORMATS } from './pdfator.model';
import { getBrowser } from './setup';
import { MOBILE_USERAGENT, MOBILE_DIMENSION, LOADING_TIMEOUT } from './config';

export async function convert({ url, outputFile, size, flushToDisk, extension, mobileViewport }: IConverterConfig) {
  debug('Attempt to get browser');

  const browser = await getBrowser();
  const page = await browser.newPage();
  await page.emulateMedia('screen');
  const response = await page.goto(url, {
    waitUntil: 'networkidle0',
    timeout: LOADING_TIMEOUT
  });

  if (!response) {
    debug('[ERROR] response does not exist');
    throw new Error('Response does not exist');
  }
  debug(`Page gone to ${url} with status ${response.status()}`);

  const formatConfig = PDFATOR_FORMATS[extension];

  const config = {
    path: flushToDisk ? `${outputFile}${formatConfig.extension}` : undefined
  };

  if (mobileViewport) {
    debug('Simulate a mobile viewport');
    page.setUserAgent(MOBILE_USERAGENT);

    await page.setViewport({
      width: MOBILE_DIMENSION.width,
      height: MOBILE_DIMENSION.height,
      isMobile: mobileViewport
    });
  }

  let result: Buffer;
  if (extension === 'PDF') {
    const pdfConfig = {
      ...config,
      format: size,
      printBackground: true,
      scale: 0.78,
      margin: { top: '0', right: '0', bottom: '0', left: '0' }
    };
    debug('Start PDF conversion with config', pdfConfig);

    result = await page.pdf(pdfConfig);
  } else if (extension === 'PNG') {
    const pngConfig = { ...config, fullPage: true };
    debug('Start PNG conversion with config', pngConfig);

    result = await page.screenshot(pngConfig);
  } else {
    throw new Error(`Unsupported format ${extension}`);
  }

  await browser.close();
  debug('Conversion done !');
  return result;
}
