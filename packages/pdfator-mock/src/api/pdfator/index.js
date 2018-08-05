const { createReadStream } = require('fs');
const { join } = require('path');
const Router = require('koa-router');

const pdfatorRouter = new Router();

const DEFAULT_CONF = {
  url: 'https://google.fr',
  extension: 'PDF',
  size: 'Letter'
};

pdfatorRouter.get('/', ctx => {
  const url = ctx.query.url || DEFAULT_CONF.url;
  const extension = ctx.query.extension || DEFAULT_CONF.extension;
  const size = ctx.query.size || DEFAULT_CONF.size;
  ctx.redirect(
    `/pdfator/file/${encodeURIComponent(url)}/${encodeURIComponent(
      extension
    )}/${encodeURIComponent(size)}`
  );
});

pdfatorRouter.get('/file/:url/:extension/:size', ctx => {
  const url = ctx.params.url;
  const extension = ctx.params.extension;
  const size = ctx.params.size;

  const pdf = createReadStream(join(__dirname, '../../../assets/sample.pdf'));

  ctx.set('X-pfdator-mock', `${url}-${extension}-${size}`);
  ctx.set('Content-Type', 'application/pdf');
  ctx.body = pdf;
});

module.exports = pdfatorRouter;
