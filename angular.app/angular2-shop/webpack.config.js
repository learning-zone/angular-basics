// ```
// @datatype_void
// david.r.niciforovic@gmail.com
// webpack.config.js may be freely distributed under the MIT license
// ```

// Look in `./config` folder for `webpack.*.config.js`
switch (process.env.NODE_ENV) {
  case 'prod':
  case 'production':
    module.exports = require('./config/webpack.prod');
    break;
  case 'test':
  case 'testing':
    module.exports = require('./config/webpack.test');
    break;
  case 'dev':
  case 'development':
  default:
    module.exports = require('./config/webpack.dev');
}
