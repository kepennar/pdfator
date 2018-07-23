import * as puppeteer from 'puppeteer';

export interface IConverterConfig {
  url: string;
  outputFile: string;
  format: PDFatorSizes;
  flushToDisk: boolean;
}

export type PDFatorSizes = puppeteer.PDFFormat;

export enum PDFatorFormat {
  PDF = 'application/pdf',
  PNG = 'image/png'
}
