const path = require('path');
const appRootPath = require('app-root-path');
var { name, version } = require(appRootPath + path.sep + 'package.json');

const defaultChecker = async () => ({ name: 'status', value: 'OK' });

module.exports = function(checks = []) {
  return async (ctx, next) => {
    const checkers = await Promise.all(
      [defaultChecker, ...checks].map(fn => fn())
    );
    ctx.body = {
      name,
      version,
      checkers
    };
    next();
  };
};
