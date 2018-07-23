/// <reference types="node" />
import * as puppeteer from 'puppeteer';
export interface IConverterConfig {
    url: string;
    outputFile: string;
    format: puppeteer.PDFFormat;
    flushToDisk: boolean;
}
export declare enum PDFatorFormat {
    PDF = "application/pdf",
    PNG = "image/png"
}
export declare function convert({ url, outputFile, format, flushToDisk }: IConverterConfig): Promise<Buffer>;
export declare function getFormatFromFilename(filename: string): PDFatorFormat;
