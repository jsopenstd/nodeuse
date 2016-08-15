'use strict';

const JS_EXT   = /\.js$/i,
      JSON_EXT = /\.json$/i,
      YAML_EXT = /\.ya?ml$/i;

module.exports = {

    /**
     *
     * @param {string} path
     *
     * @returns {boolean}
     */
    isJS : (path) => {
        return JS_EXT.test(path);
    },

    /**
     *
     * @param {string} path
     *
     * @returns {boolean}
     */
    isJSON : (path) => {
        return JSON_EXT.test(path);
    },

    /**
     *
     * @param {string} path
     *
     * @returns {boolean}
     */
    isYAML : (path) => {
        return YAML_EXT.test(path);
    }
};
