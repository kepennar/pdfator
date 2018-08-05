import * as puppeteer from 'puppeteer';

export interface IConverterConfig {
  url: string;
  outputFile: string;
  size: PDFatorSizes;
  flushToDisk: boolean;
  extension: PDFatorFormatKeys;
}

export type PDFatorSizes = puppeteer.PDFFormat;

export type PDFatorFormatKeys = 'PDF' | 'PNG';

export type IPdfatorFormats = { [K in PDFatorFormatKeys]: IPdfatorFormat };

export interface IPdfatorFormat {
  extension: string;
  mime: string;
  type: PDFatorFormatKeys;
}
export const PDFATOR_FORMATS: IPdfatorFormats = {
  PDF: {
    extension: '.pdf',
    mime: 'application/pdf',
    type: 'PDF'
  },
  PNG: {
    extension: '.png',
    mime: 'image/png',
    type: 'PNG'
  }
};
