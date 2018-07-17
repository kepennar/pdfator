import {
  convert,
  debug,
  IConverterConfig,
  getFormatFromFilename
} from '@pdfator/core';
import { APIGatewayEvent, Callback, Context } from 'aws-lambda';
import { S3 } from 'aws-sdk';
import * as puppeteer from 'puppeteer';
const sha1 = require('sha1');

type PutS3Output = S3.Types.PutObjectOutput;
type GetS3Output = S3.Types.GetObjectOutput;

const S3Bucket = new S3({
  signatureVersion: 'v4'
});

const REGION = process.env.REGION || 'eu-west-3';
const BUCKET_NAME = process.env.BUCKET || '';
if (!BUCKET_NAME) {
  throw new Error('"process.env.BUCKET" is mandatory');
}

const defaultConfig: IConverterConfig = {
  url: 'https://google.fr',
  outputFile: 'google.pdf',
  format: 'Letter',
  flushToDisk: false
};

export async function pdfatorHandler(
  event: APIGatewayEvent,
  context: Context,
  callback: Callback
) {
  debug('Start pdfatorHandler');

  // For keeping the browser launch
  context.callbackWaitsForEmptyEventLoop = false;
  try {
    const queryStringParameters = event.queryStringParameters || {};
    const url = queryStringParameters.url || defaultConfig.url;
    const outputFile =
      queryStringParameters.outputFile || defaultConfig.outputFile;
    const format = (queryStringParameters.format ||
      defaultConfig.format) as puppeteer.PDFFormat;

    const S3Key = generateS3key(url, outputFile, format);
    let objectOutput: PutS3Output | null = await retrieveFromS3(S3Key);

    if (!objectOutput) {
      const converterConfig = {
        url,
        format,
        outputFile,
        flushToDisk: false
      };
      debug('Call converter with config', converterConfig);
      const pdfAtorFormat = getFormatFromFilename(outputFile);
      const result = await convertWebpage(converterConfig);

      objectOutput = await S3Bucket.putObject({
        Bucket: BUCKET_NAME,
        Key: event.requestContext.requestId,
        ContentType: pdfAtorFormat,
        Body: result
      }).promise();
    }

    const response = {
      statusCode: 200,
      headers: { location: generateUrl(S3Key) },
      body: ''
    };
    callback(null, response);
  } catch (err) {
    callback(err);
  }
}

export function convertWebpage(config: IConverterConfig = defaultConfig) {
  return convert(config);
}

async function retrieveFromS3(key: string): Promise<GetS3Output | null> {
  try {
    return await S3Bucket.getObject({
      Bucket: BUCKET_NAME,
      Key: key
    }).promise();
  } catch (error) {
    debug(error);
    return null;
  }
}

function generateS3key(
  url: string,
  format: string,
  outputfile: string
): string {
  return sha1(`${url}-${format}-${outputfile}`);
}

function generateUrl(key: string) {
  return `https://${BUCKET_NAME}.s3.${REGION}.amazonaws.com/${key}`;
}
