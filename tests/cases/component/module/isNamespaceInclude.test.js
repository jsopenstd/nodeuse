'use strict';

const assert  = require('assert'),
      vars    = require('../../../variables'),

      cmodule = require(vars.component.module);

module.exports = {
    'component/module.js' : {

        '.isNamespaceInclude()' : () => {
            if (vars.isDebug) {
                assert(cmodule.isNamespaceInclude()   === false);
                assert(cmodule.isNamespaceInclude('') === false);

                // namespaces - valid
                assert(cmodule.isNamespaceInclude('js.*')      === true);
                assert(cmodule.isNamespaceInclude('js.lang.*') === true);

                // namespaces - invalid
                assert(cmodule.isNamespaceInclude('js.')      === false);
                assert(cmodule.isNamespaceInclude('js.lang.') === false);
                assert(cmodule.isNamespaceInclude('js.lang')  === false);

                // modules - valid
                assert(cmodule.isNamespaceInclude('js.lang.Exception') === false);
                assert(cmodule.isNamespaceInclude('js.web.HTTP')       === false);
                assert(cmodule.isNamespaceInclude('js.web.JSON')       === false);

                // modules - invalid
                assert(cmodule.isNamespaceInclude('js.lang.Exception.path') === false);
                assert(cmodule.isNamespaceInclude('js.lang.Exception.Path') === false);

                // partials - valid
                assert(cmodule.isNamespaceInclude('js.partial.foreach')  === false);
                assert(cmodule.isNamespaceInclude('js.partial.optionOf') === false);
                assert(cmodule.isNamespaceInclude('js.partial.printf')   === false);
                assert(cmodule.isNamespaceInclude('js.partial.format')   === false);
            }
        }
    }
};
