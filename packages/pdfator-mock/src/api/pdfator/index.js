const { createReadStream } = require('fs');
const { join } = require('path');
const Router = require('koa-router');

const pdfatorRouter = new Router();

const DEFAULT_CONF = {
  url: 'https://google.fr',
  outputFile: 'google.pdf',
  format: 'Letter',
  flushToDisk: false
};

pdfatorRouter.get('/', ctx => {
  const url = ctx.query.url || DEFAULT_CONF.url;
  const outputFile = ctx.query.outputFile || DEFAULT_CONF.outputFile;
  const format = ctx.query.format || DEFAULT_CONF.format;
  ctx.redirect(
    `/pdfator/file/${encodeURIComponent(url)}/${encodeURIComponent(
      outputFile
    )}/${encodeURIComponent(format)}`
  );
});

pdfatorRouter.get('/file/:url/:outputFile/:format', ctx => {
  const url = ctx.params.url;
  const outputFile = ctx.params.outputFile;
  const format = ctx.params.format;

  const pdf = createReadStream(join(__dirname, '../../../assets/sample.pdf'));

  ctx.set('X-pfdator-mock', `${url}-${outputFile}-${format}`);
  ctx.set('Content-Type', 'application/pdf');
  ctx.body = pdf;
});

module.exports = pdfatorRouter;
