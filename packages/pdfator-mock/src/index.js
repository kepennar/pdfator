const Koa = require('koa');
const helmet = require('koa-helmet');
const accesslog = require('koa-morgan');
const bodyParser = require('koa-bodyparser');
const compress = require('koa-compress');

const config = require('./config');
const serverConfig = config.get('server');
const logConfig = config.get('log');

const apis = require('./api');

const app = new Koa();

app.use(helmet());
app.use(accesslog(logConfig.format));
app.use(compress());
app.use(bodyParser());

app.use(apis.routes(), apis.allowedMethods());

app.listen(serverConfig.port);
console.log('listening on port', serverConfig.port);
