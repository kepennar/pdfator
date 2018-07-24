import {
  convert,
  debug,
  IConverterConfig,
  getFormatFromFilename,
  PDFatorSizes
} from '@pdfator/core';
import { APIGatewayEvent, Callback, Context } from 'aws-lambda';
import { S3 } from 'aws-sdk';
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

const DEFAULT_CONFIG: IConverterConfig = {
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
    const converterConfig = configFromEvent(event);

    const S3Key = generateS3key(converterConfig);
    let objectOutput: PutS3Output | null = await retrieveFromS3(S3Key);

    if (!objectOutput) {
      debug('Call converter with config', converterConfig);
      const pdfAtorFormat = getFormatFromFilename(converterConfig.outputFile);
      const result = await convertWebpage(converterConfig);

      objectOutput = await S3Bucket.putObject({
        Bucket: BUCKET_NAME,
        Key: S3Key,
        ContentType: pdfAtorFormat,
        Body: result
      }).promise();
    }

    const response = {
      statusCode: 301,
      headers: { location: generateUrl(S3Key) },
      body: ''
    };
    callback(null, response);
  } catch (err) {
    callback(err);
  }
}

export function convertWebpage(config: IConverterConfig = DEFAULT_CONFIG) {
  return convert(config);
}

function configFromEvent(event: APIGatewayEvent): IConverterConfig {
  const query = event.queryStringParameters;
  if (!query) {
    return DEFAULT_CONFIG;
  }
  return {
    url: query.url || DEFAULT_CONFIG.url,
    outputFile: query.outputFile || DEFAULT_CONFIG.outputFile,
    format: (query.format || DEFAULT_CONFIG.format) as PDFatorSizes,
    flushToDisk: false
  };
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

function generateS3key({ url, format, outputFile }: IConverterConfig): string {
  return sha1(`${url}-${format}-${outputFile}`);
}

function generateUrl(key: string) {
  return `https://s3.${REGION}.amazonaws.com/${BUCKET_NAME}/${key}`;
}
