import * as puppeteer from 'puppeteer';
export interface IConverterConfig {
    url: string;
    outputFile: string;
    format: puppeteer.PDFFormat;
}
export declare function convert({ url, outputFile, format }: IConverterConfig): Promise<void>;
