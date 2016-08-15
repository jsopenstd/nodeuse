'use strict';

const node_fs = require('fs'),
      yaml    = require('yamljs'),

      cfile   = require('./file');

module.exports = {

    /**
     *
     * @param output
     * @returns {*}
     */
    package : (output) => {
        /** @debug */
        return output;
        /***/
    },

    /**
     *
     * @param output
     * @returns {*}
     */
    module : (output) => {
        /** @debug */
        return output;
        /***/
    },

    getModulesDir : () => {
        /** @debug */
        return '/tests/test_modules/';
        /***/
    },
};
