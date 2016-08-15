'use strict';

const assert  = require('assert'),
      vars    = require('../../../variables'),

      cmodule = require(vars.component.module);

function requireFunction(path) {
    return path;
}

module.exports = {
    'component/module.js' : {

        '.buildIncludeTree()' : {

            'basic includes' : () => {
                if (vars.isDebug) {
                    let includes;

                    // single include
                    includes = cmodule.buildIncludeTree(
                        'js.lang.*',
                        [
                            '/js.lang.class',
                        ],
                        requireFunction
                    );

                    assert.deepStrictEqual(
                        includes,
                        {
                            Class : '/js.lang.class',
                        }
                    );

                    // 2 includes
                    includes = cmodule.buildIncludeTree(
                        'js.lang.*',
                        [
                            '/js.lang.class',
                            '/js.lang.interface',
                        ],
                        requireFunction
                    );

                    assert.deepStrictEqual(
                        includes,
                        {
                            Class     : '/js.lang.class',
                            Interface : '/js.lang.interface',
                        }
                    );

                    // 3 includes
                    includes = cmodule.buildIncludeTree(
                        'js.lang.*',
                        [
                            '/js.lang.class',
                            '/js.lang.interface',
                            '/js.lang.exception',
                        ],
                        requireFunction
                    );

                    assert.deepStrictEqual(
                        includes,
                        {
                            Class     : '/js.lang.class',
                            Interface : '/js.lang.interface',
                            Exception : '/js.lang.exception',
                        }
                    );
                }
            },

            'includes with one namespace' : () => {
                if (vars.isDebug) {
                    let includes;

                    // single include
                    includes = cmodule.buildIncludeTree(
                        'js.*',
                        [
                            '/js.lang.class',
                        ],
                        requireFunction
                    );

                    assert.deepStrictEqual(
                        includes,
                        {
                            lang : {
                                Class : '/js.lang.class',
                            }
                        }
                    );

                    // 2 includes
                    includes = cmodule.buildIncludeTree(
                        'js.*',
                        [
                            '/js.lang.class',
                            '/js.lang.interface',
                        ],
                        requireFunction
                    );

                    assert.deepStrictEqual(
                        includes,
                        {
                            lang : {
                                Class:     '/js.lang.class',
                                Interface: '/js.lang.interface',
                            }
                        }
                    );

                    // 3 includes
                    includes = cmodule.buildIncludeTree(
                        'js.*',
                        [
                            '/js.lang.class',
                            '/js.lang.interface',
                            '/js.lang.exception',
                        ],
                        requireFunction
                    );

                    assert.deepStrictEqual(
                        includes,
                        {
                            lang : {
                                Class:     '/js.lang.class',
                                Interface: '/js.lang.interface',
                                Exception: '/js.lang.exception',
                            }
                        }
                    );
                }
            },

            'includes with multiple namespaces' : () => {
                if (vars.isDebug) {
                    let includes;

                    // 2 includes
                    includes = cmodule.buildIncludeTree(
                        'js.*',
                        [
                            '/js.lang.class',
                            '/js.web.j-s-o-n',
                        ],
                        requireFunction
                    );

                    assert.deepStrictEqual(
                        includes,
                        {
                            lang : {
                                Class: '/js.lang.class',
                            },
                            web : {
                                JSON: '/js.web.j-s-o-n',
                            }
                        }
                    );

                    // multiple includes per namespaces
                    includes = cmodule.buildIncludeTree(
                        'js.*',
                        [
                            '/js.lang.class',
                            '/js.lang.interface',
                            '/js.web.h-t-t-p',
                            '/js.web.j-s-o-n',
                        ],
                        requireFunction
                    );

                    assert.deepStrictEqual(
                        includes,
                        {
                            lang : {
                                Class:     '/js.lang.class',
                                Interface: '/js.lang.interface',
                            },
                            web : {
                                HTTP: '/js.web.h-t-t-p',
                                JSON: '/js.web.j-s-o-n',
                            }
                        }
                    );
                }
            },
        }
    }
};
