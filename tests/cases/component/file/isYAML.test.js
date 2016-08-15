'use strict';

const assert = require('assert'),
      vars   = require('../../../variables'),

      file   = require(vars.component.file);

module.exports = {
    'component/file.js' : {

        '.isYAML()' : () => {
            assert(file.isYAML()   === false);
            assert(file.isYAML('') === false);

            assert(file.isYAML('*.yml')    === true);
            assert(file.isYAML('file.yml') === true);
            assert(file.isYAML('file.YML') === true);
            assert(file.isYAML('file.Yml') === true);

            assert(file.isYAML('*.yaml')    === true);
            assert(file.isYAML('file.yaml') === true);
            assert(file.isYAML('file.YAML') === true);
            assert(file.isYAML('file.Yaml') === true);

            assert(file.isYAML('file.yamls') === false);
            assert(file.isYAML('file.yaml ') === false);
            assert(file.isYAML('file. yam')  === false);
            assert(file.isYAML('file. yaml') === false);
        }
    }
};
