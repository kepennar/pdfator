import { convert, debug, IConverterConfig, PDFatorFormatKeys, PDFatorSizes, PDFATOR_FORMATS } from '@pdfator/core';
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
  size: 'Letter',
  extension: 'PDF',
  mobileViewport: false,
  flushToDisk: false
};

export async function pdfatorHandler(event: APIGatewayEvent, context: Context, callback: Callback) {
  debug('Start pdfatorHandler');

  // For keeping the browser launch
  context.callbackWaitsForEmptyEventLoop = false;
  try {
    const converterConfig = configFromEvent(event);

    const S3Key = generateS3key(converterConfig);
    let objectOutput: PutS3Output | null = await retrieveFromS3(S3Key);

    if (!objectOutput) {
      debug('Call converter with config', converterConfig);
      const result = await convertWebpage(converterConfig);

      objectOutput = await S3Bucket.putObject({
        Bucket: BUCKET_NAME,
        Key: S3Key,
        ContentType: PDFATOR_FORMATS[converterConfig.extension].mime,
        Body: result
      }).promise();
    }

    const response = {
      statusCode: 301,
      headers: {
        location: generateUrl(S3Key),
        'Access-Control-Allow-Origin': '*'
      },
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
  const extension = query.extension;
  if (extension && !['PDF', 'PNG'].includes(extension)) {
    throw new Error('extension have to be one of "PDF", "PNG"');
  }

  return {
    url: query.url || DEFAULT_CONFIG.url,
    outputFile: DEFAULT_CONFIG.outputFile,
    mobileViewport: query.mobileViewport === 'true',
    size: (query.size || DEFAULT_CONFIG.size) as PDFatorSizes,
    extension: (extension as PDFatorFormatKeys) || DEFAULT_CONFIG.extension,
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

function generateS3key({ url, extension, size }: IConverterConfig): string {
  return sha1(`${url}-${extension}-${size}`);
}

function generateUrl(key: string) {
  return `https://s3.${REGION}.amazonaws.com/${BUCKET_NAME}/${key}`;
}
