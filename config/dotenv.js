/* eslint-env node */

'use strict';

const path = require('path');

module.exports = function (/* env */) {
  return {
    clientAllowedKeys: [
      'GOOGLE_API_KEY',
      'DEV_BACKEND_URL',
      'PROD_BACKEND_URL',
    ],
    fastbootAllowedKeys: [],
    failOnMissingKey: false,
    path: path.join(path.dirname(__dirname), '.env'),
  };
};
