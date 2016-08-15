'use strict';

const assert = require('assert'),
      vars   = require('../../../variables'),

      file   = require(vars.component.file);

module.exports = {
    'component/file.js' : {

        '.isJS()' : () => {
            assert(file.isJS()   === false);
            assert(file.isJS('') === false);

            assert(file.isJS('*.js')    === true);
            assert(file.isJS('file.js') === true);
            assert(file.isJS('file.Js') === true);
            assert(file.isJS('file.jS') === true);
            assert(file.isJS('file.JS') === true);

            assert(file.isJS('file.jss') === false);
            assert(file.isJS('file.js ') === false);
            assert(file.isJS('file. js') === false);
        }
    }
};
