'use strict';

const assert = require('assert'),
      vars   = require('../../../variables'),

      file   = require(vars.component.file);

module.exports = {
    'component/file.js' : {

        '.isJSON()' : () => {
            assert(file.isJSON()   === false);
            assert(file.isJSON('') === false);

            assert(file.isJSON('*.json')    === true);
            assert(file.isJSON('file.json') === true);
            assert(file.isJSON('file.JSON') === true);
            assert(file.isJSON('file.Json') === true);

            assert(file.isJSON('file.jsons') === false);
            assert(file.isJSON('file.json ') === false);
            assert(file.isJSON('file. jso')  === false);
            assert(file.isJSON('file. json') === false);
        }
    }
};
