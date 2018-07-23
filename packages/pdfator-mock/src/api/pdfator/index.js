const Router = require('koa-router');
const fetch = require('node-fetch');

const ApiError = require('../../errors');

const pdfatorRouter = new Router();

const DEFAULT_CONF = {
  url: 'https://google.fr',
  outputFile: 'google.pdf',
  format: 'Letter',
  flushToDisk: false
};

pdfatorRouter.get('/', async ctx => {
  const url = ctx.query.url || DEFAULT_CONF.url;
  const outputFile = ctx.query.url || DEFAULT_CONF.outputFile;
  const format = ctx.query.url || DEFAULT_CONF.format;

  ctx.set('Content-Type', 'application/pdf');
  ctx.status = 301;
  ctx.body = {
    url,
    outputFile,
    format
  };
});

module.exports = pdfatorRouter;
