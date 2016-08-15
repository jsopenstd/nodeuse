'use strict';

const assert = require('assert'),
      path   = require('../src/component/path'),
      log    = console.log.bind(console);

const currentDir = __dirname;

module.exports = {
    'component.path.js' : {

        'normalize' : {

            'default cases' : {
                'empty call' : () => {
                    assert(path.normalize() === '');
                },

                'directory checks' : () => {
                    // current directory
                    assert(path.normalize(currentDir) === currentDir);

                    assert(path.normalize(currentDir, '/dirs')     === `${currentDir}/dirs`);
                    assert(path.normalize(currentDir, '/', 'dirs') === `${currentDir}/dirs`);

                    assert(path.normalize(currentDir, '/dirs', '/dir')         === `${currentDir}/dirs/dir`);
                    assert(path.normalize(currentDir, '/', 'dirs', '/', 'dir') === `${currentDir}/dirs/dir`);

                    assert(path.normalize(
                        currentDir, '/dirs/dir/within/dir')                 === `${currentDir}/dirs/dir/within/dir`);

                    assert(path.normalize(
                        currentDir, '/', 'dirs/dir/', 'within', '/', 'dir') === `${currentDir}/dirs/dir/within/dir`);

                    const withinDir = path.normalize(currentDir, '/dirs/dir/within/dir');

                    assert(path.normalize(withinDir, '/dir.json')     === `${currentDir}/dirs/dir/within/dir/dir.json`);
                    assert(path.normalize(withinDir, '/dir', '.json') === `${currentDir}/dirs/dir/within/dir/dir.json`);
                },

                'file checks' : () => {

                }
            },

            'extended cases' : () => {

            },

            'edge cases' : {
                'invalid calls' : () => {
                    assert(path.normalize('')          === '');
                    assert(path.normalize(' ')         === '');
                    assert(path.normalize('    ')      === '');
                    assert(path.normalize('', '')      === '');
                    assert(path.normalize('', '', '')  === '');
                    assert(path.normalize(' ', '', '') === '');
                }
            }
        },

        'exists' : {

            'default cases' : {
                'empty call' : () => {
                    assert(path.exists() === false);
                }
            },

            'extended cases' : {

            },

            'edge cases' : {
                'invalid calls' : () => {
                    assert(path.exists('')          === false);
                    assert(path.exists(' ')         === false);
                    assert(path.exists('    ')      === false);
                    assert(path.exists('', '')      === false);
                    assert(path.exists('', '', '')  === false);
                    assert(path.exists(' ', '', '') === false);
                }
            }
        }
    }
};
