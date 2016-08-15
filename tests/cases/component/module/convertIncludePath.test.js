'use strict';

const assert  = require('assert'),
      vars    = require('../../../variables'),

      cmodule = require(vars.component.module);

module.exports = {
    'component/module.js' : {

        '.convertIncludePath()' : () => {
            if (vars.isDebug) {
                assert(cmodule.convertIncludePath()   === '');
                assert(cmodule.convertIncludePath('') === '');

                assert(cmodule.convertIncludePath('js.lang.exception')       === 'js.lang.Exception');
                assert(cmodule.convertIncludePath('js.lang.value-exception') === 'js.lang.ValueException');
                assert(cmodule.convertIncludePath('js.web.h-t-t-p')          === 'js.web.HTTP');
                assert(cmodule.convertIncludePath('js.web.h-t-t-p-agent')    === 'js.web.HTTPAgent');
                assert(cmodule.convertIncludePath('js.web.j-s-o-n')          === 'js.web.JSON');
            }
        }
    }
};
