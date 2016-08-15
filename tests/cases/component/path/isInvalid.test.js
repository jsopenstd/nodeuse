'use strict';

const assert = require('assert'),
      vars   = require('../../../variables'),

      path   = require(vars.component.path);

module.exports = {
    'component/path.js' : {

        '.isInvalid()' : () => {
            assert(path.isInvalid() === true);

            assert(path.isInvalid('')    === true);
            assert(path.isInvalid(' ')   === true);
            assert(path.isInvalid('   ') === true);

            assert(path.isInvalid('//')    === false);
            assert(path.isInvalid('// ')   === true);
            assert(path.isInvalid('//  ')  === true);
            assert(path.isInvalid('//   ') === true);

            assert(path.isInvalid('js.* ')               === true);
            assert(path.isInvalid(' js.lang.Exception')  === true);
            assert(path.isInvalid('js. partial.foreach') === true);

            assert(path.isInvalid('.')         === false);
            assert(path.isInvalid('./')        === false);

            assert(path.isInvalid('*')         === false);
            assert(path.isInvalid('js.lang.*') === false);

            assert(path.isInvalid('js.*')               === false);
            assert(path.isInvalid('js.lang.Exception')  === false);
            assert(path.isInvalid('js.partial.foreach') === false);

            assert(path.isInvalid('//.')            === false);
            assert(path.isInvalid('//*')            === false);
            assert(path.isInvalid('//package.json') === false);
        }
    }
};
