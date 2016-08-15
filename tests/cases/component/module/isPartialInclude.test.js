'use strict';

const assert  = require('assert'),
      vars    = require('../../../variables'),

      cmodule = require(vars.component.module);

module.exports = {
    'component/module.js' : {

        '.isPartialInclude()' : () => {
            if (vars.isDebug) {
                assert(cmodule.isPartialInclude()   === false);
                assert(cmodule.isPartialInclude('') === false);

                // namespaces - valid
                assert(cmodule.isPartialInclude('js.*')      === false);
                assert(cmodule.isPartialInclude('js.lang.*') === false);

                // namespaces - invalid
                assert(cmodule.isPartialInclude('js.')      === false);
                assert(cmodule.isPartialInclude('js.lang.') === false);
                assert(cmodule.isPartialInclude('js.lang')  === false);

                // modules - valid
                assert(cmodule.isPartialInclude('js.lang.Exception') === false);
                assert(cmodule.isPartialInclude('js.web.HTTP')       === false);
                assert(cmodule.isPartialInclude('js.web.JSON')       === false);

                // modules - invalid
                assert(cmodule.isPartialInclude('js.lang.Exception.path') === false);
                assert(cmodule.isPartialInclude('js.lang.Exception.Path') === false);

                // partials - valid
                assert(cmodule.isPartialInclude('js.partial.foreach')  === true);
                assert(cmodule.isPartialInclude('js.partial.optionOf') === true);
                assert(cmodule.isPartialInclude('js.partial.printf')   === true);
                assert(cmodule.isPartialInclude('js.partial.format')   === true);
            }
        }
    }
};
