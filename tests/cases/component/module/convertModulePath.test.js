'use strict';

const assert  = require('assert'),
      vars    = require('../../../variables'),

      cmodule = require(vars.component.module);

module.exports = {
    'component/module.js' : {

        '.convertModulePath()' : () => {
            if (vars.isDebug) {
                assert(cmodule.convertModulePath()   === '');
                assert(cmodule.convertModulePath('') === '');

                assert(cmodule.convertModulePath('js.lang.Exception')      === 'js.lang.exception');
                assert(cmodule.convertModulePath('js.lang.ValueException') === 'js.lang.value-exception');
                assert(cmodule.convertModulePath('js.web.HTTP')            === 'js.web.h-t-t-p');
                assert(cmodule.convertModulePath('js.web.HTTPAgent')       === 'js.web.h-t-t-p-agent');
                assert(cmodule.convertModulePath('js.web.JSON')            === 'js.web.j-s-o-n');
            }
        }
    }
};
