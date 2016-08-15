'use strict';

const assert    = require('assert'),
      node_path = require('path'),
      vars      = require('../../../variables'),

      path   = require(vars.component.path);

module.exports = {
    'component/path.js' : {

        '.isFile()' : () => {
            assert(path.isFile() === false);

            assert(path.isFile(__dirname)  === false);
            assert(path.isFile(__filename) === true);
        }
    }
};
