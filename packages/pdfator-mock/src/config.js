const convict = require('convict');
require('dotenv').config();

const config = convict({
  server: {
    port: {
      doc: 'server port',
      format: 'port',
      default: 3000,
      env: 'PORT'
    }
  },
  log: {
    format: {
      doc: 'Log format',
      format: '*',
      default: 'tiny',
      env: 'LOG_FORMAT'
    }
  }
});

config.validate({ allowed: 'strict' });
module.exports = config;
