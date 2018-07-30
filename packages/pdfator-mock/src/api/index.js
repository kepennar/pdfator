const Router = require('koa-router');

const health = require('./health');
const pdfatorRouter = require('./pdfator');

const apiRouter = new Router();

apiRouter.get('/', ctx => (ctx.body = 'Welcome to PDFATOR-mocks'));
apiRouter.use(
  '/pdfator',
  pdfatorRouter.routes(),
  pdfatorRouter.allowedMethods()
);

// Possibility to customize checks
//  app.use(health([async () => { Check connectivity} ]));
apiRouter.get('/health', health());

apiRouter.get(
  '/routes',
  ctx =>
    (ctx.body = apiRouter.stack
      .filter(r => r.methods && r.methods.length > 0)
      .map(r => ({
        path: r.path,
        method: r.methods
      })))
);
module.exports = apiRouter;
