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

        // if file exists, check the extension and return the file accordingly
        if (node_fs.existsSync(output)) {

            // if it is a regular JavaScript file, require it
            if (cfile.isJS(output)) {
                return require(output);
            }

            // if it is a JSON file, just simply require it
            if (cfile.isJSON(output)) {
                return require(output);
            }

            // if it is a YAML file, parse it accordingly and return it
            if (cfile.isYAML(output)) {
                return yaml.load(output);
            }

            // return as a regular string
            return node_fs.readFileSync(output, 'utf8');

        } else {
            throw new Error(`Package path cannot be found: "${output}"`);
        }
    },

    /**
     *
     * @param output
     * @returns {*}
     */
    module : (output) => {

        return require(output);
    },

    getModulesDir : () => {

        return '/node_modules/';
    },
};
