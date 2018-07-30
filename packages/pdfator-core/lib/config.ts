import { extname, join, sep } from 'path';
import { PDFatorFormat } from './pdfator.model';

export const localChromePath = join('headless-chromium.zip');
export const setupChromePath = join(sep, 'tmp');
export const executablePath = join(setupChromePath, 'headless-chromium');

export const DEBUG = !!process.env.DEBUG;
export const WITH_LOCAL_CHROME = !!process.env.LOCAL_CHROME;

export function getFormatFromFilename(filename: string): PDFatorFormat {
  const ext = extname(filename);
  return ext === '.png' ? PDFatorFormat.PNG : PDFatorFormat.PDF;
}
