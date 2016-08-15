'use strict';

const assert = require('assert'),
      vars   = require('../../../variables'),

      path   = require(vars.component.path);

module.exports = {
    'component/path.js' : {

        '.isEmpty()' : () => {
            assert(path.isEmpty() === true);

            assert(path.isEmpty('')    === true);
            assert(path.isEmpty(' ')   === true);
            assert(path.isEmpty('   ') === true);

            assert(path.isEmpty('//')    === true);
            assert(path.isEmpty('// ')   === true);
            assert(path.isEmpty('//  ')  === true);
            assert(path.isEmpty('//   ') === true);

            assert(path.isEmpty('.')         === false);
            assert(path.isEmpty('*')         === false);
            assert(path.isEmpty('js.lang.*') === false);

            assert(path.isEmpty('//.')            === false);
            assert(path.isEmpty('//*')            === false);
            assert(path.isEmpty('//package.json') === false);
        }
    }
};
