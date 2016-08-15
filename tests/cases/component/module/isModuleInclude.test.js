'use strict';

const assert  = require('assert'),
      vars    = require('../../../variables'),

      cmodule = require(vars.component.module);

module.exports = {
    'component/module.js' : {

        '.isModuleInclude()' : () => {
            if (vars.isDebug) {
                assert(cmodule.isModuleInclude()   === false);
                assert(cmodule.isModuleInclude('') === false);

                // namespaces - valid
                assert(cmodule.isModuleInclude('js.*')      === false);
                assert(cmodule.isModuleInclude('js.lang.*') === false);

                // namespaces - invalid
                assert(cmodule.isModuleInclude('js.')      === false);
                assert(cmodule.isModuleInclude('js.lang.') === false);
                assert(cmodule.isModuleInclude('js.lang')  === false);

                // modules - valid
                assert(cmodule.isModuleInclude('js.lang.Exception') === true);
                assert(cmodule.isModuleInclude('js.web.HTTP')       === true);
                assert(cmodule.isModuleInclude('js.web.JSON')       === true);

                // modules - invalid
                assert(cmodule.isModuleInclude('js.lang.Exception.path') === false);
                assert(cmodule.isModuleInclude('js.lang.Exception.Path') === false);

                // partials - valid
                assert(cmodule.isModuleInclude('js.partial.foreach')  === false);
                assert(cmodule.isModuleInclude('js.partial.optionOf') === false);
                assert(cmodule.isModuleInclude('js.partial.printf')   === false);
                assert(cmodule.isModuleInclude('js.partial.format')   === false);
            }
        }
    }
};
