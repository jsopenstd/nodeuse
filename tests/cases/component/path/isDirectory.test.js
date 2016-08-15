'use strict';

const assert    = require('assert'),
      node_path = require('path'),
      vars      = require('../../../variables'),

      path   = require(vars.component.path);

module.exports = {
    'component/path.js' : {

        '.isDirectory()' : () => {
            assert(path.isDirectory() === false);

            assert(path.isDirectory(__dirname)  === true);
            assert(path.isDirectory(__filename) === false);
        }
    }
};
