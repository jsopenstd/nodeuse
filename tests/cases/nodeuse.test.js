'use strict';

const assert  = require('assert'),
      vars    = require('../variables'),

      use = require(vars.nodeuse);

const log = console.log.bind(console);

/**
 *
 * @param {string} string
 * @param {string} substring
 */
function endsWith(string, substring) {
    let index = string.lastIndexOf(substring);

    return string.substr(index) === substring;
}

module.exports = {
    'nodeuse.js': {
        'include file' : () => {
            if (vars.isDebug) {
                assert(endsWith(use('//package.json'),   '/package.json'));
                assert(endsWith(use('//data.yml'),       '/data.yml'));
                assert(endsWith(use('//src/project.js'), '/src/project.js'));
                assert(endsWith(use('//test/index.js'),  '/test/index.js'));
            }

            if (vars.isIsolation) {
                let package_json = use('//package.json');

                assert(package_json.name        === 'test-package');
                assert(package_json.description === 'test package description');

                let data = use('//data.yml');

                assert(Array.isArray(data.some));
                assert(data.some[0] === 'data1');
                assert(data.some[1] === 'data2');

                assert(typeof data.another === 'object');
                assert(data.another.one === 123);
                assert(data.another.two === 456);

                let file = use('//src/file.js');

                assert(file.data.in.json === 42);

                let textfile = use('//textfile');

                assert(textfile === 'A simple text file with some filler data.');
            }
        },

        'include partial' : () => {
            if (vars.isDebug) {
                assert(endsWith(use('js.partial.foreach'), '/js.partial.foreach'));
                assert(endsWith(use('js.partial.option'),  '/js.partial.option'));
                assert(endsWith(use('js.partial.format'),  '/js.partial.format'));
                assert(endsWith(use('js.partial.printf'),  '/js.partial.printf'));
            }

            if (vars.isIsolation) {
                let partial_foreach = use('js.partial.foreach');

                assert(typeof partial_foreach === 'function');
                assert(partial_foreach() === 'foreach');

                let partial_option = use('js.partial.option');

                assert(typeof partial_option === 'function');
                assert(partial_option() === 'option');

                let partial_format = use('js.partial.format');

                assert(typeof partial_format === 'function');
                assert(partial_format() === 'format');

                let partial_printf = use('js.partial.printf');

                assert(typeof partial_printf === 'function');
                assert(partial_printf() === 'printf');
            }
        },

        'include module' : () => {
            if (vars.isDebug) {
                assert(endsWith(use('js.lang.Class'),     '/js.lang.class'));
                assert(endsWith(use('js.lang.Interface'), '/js.lang.interface'));
                assert(endsWith(use('js.lang.Exception'), '/js.lang.exception'));

                assert(endsWith(use('js.web.HTTP'),       '/js.web.h-t-t-p'));
                assert(endsWith(use('js.web.JSON'),       '/js.web.j-s-o-n'));
                assert(endsWith(use('js.web.YAMLHelper'), '/js.web.y-a-m-l-helper'));
            }

            if (vars.isIsolation) {
                let Class = use('js.lang.Class');
                assert(Class.getName() === 'Class');

                let Interface = use('js.lang.Interface');
                assert(Interface.getName() === 'Interface');

                let Exception = use('js.lang.Exception');
                assert(Exception.getName() === 'Exception');

                let HTTP = use('js.web.HTTP');
                assert(HTTP.getName() === 'HTTP');

                let JSON = use('js.web.JSON');
                assert(JSON.getName() === 'JSON');

                let YAMLHelper = use('js.web.YAMLHelper');
                assert(YAMLHelper.getName() === 'YAMLHelper');
            }
        },

        'include namespace' : () => {
            if (vars.isDebug) {
                let js = use('js.*');

                assert(typeof js         === 'object');
                assert(typeof js.lang    === 'object');
                assert(typeof js.partial === 'object');
                assert(typeof js.util    === 'object');
                assert(typeof js.web     === 'object');

                assert(endsWith(js.lang.Class,     '/js.lang.class'));
                assert(endsWith(js.lang.Interface, '/js.lang.interface'));
                assert(endsWith(js.lang.Exception, '/js.lang.exception'));

                assert(endsWith(js.partial.foreach, '/js.partial.foreach'));
                assert(endsWith(js.partial.format,  '/js.partial.format'));
                assert(endsWith(js.partial.option,  '/js.partial.option'));
                assert(endsWith(js.partial.printf,  '/js.partial.printf'));

                assert(endsWith(js.util.Parser, '/js.util.parser'));
                assert(endsWith(js.util.Tester, '/js.util.tester'));

                assert(typeof js.util.parser === 'object');
                assert(endsWith(js.util.parser.Extensions, '/js.util.parser.extensions'));

                assert(typeof js.util.tester === 'object');
                assert(endsWith(js.util.tester.Exceptions, '/js.util.tester.exceptions'));

                assert(typeof js.util.tester.exceptions === 'object');
                assert(endsWith(js.util.tester.exceptions.ArgException,    '/js.util.tester.exceptions.arg-exception'));
                assert(endsWith(js.util.tester.exceptions.TesterException, '/js.util.tester.exceptions.tester-exception'));
                assert(endsWith(js.util.tester.exceptions.ValueException,  '/js.util.tester.exceptions.value-exception'));

                assert(endsWith(js.web.HTTP,       '/js.web.h-t-t-p'));
                assert(endsWith(js.web.JSON,       '/js.web.j-s-o-n'));
                assert(endsWith(js.web.YAMLHelper, '/js.web.y-a-m-l-helper'));
            }

            if (vars.isIsolation) {
                let js = use('js.*');

                assert(typeof js         === 'object');
                assert(typeof js.lang    === 'object');
                assert(typeof js.partial === 'object');
                assert(typeof js.util    === 'object');
                assert(typeof js.web     === 'object');

                assert(js.lang.Class.getName()     === 'Class');
                assert(js.lang.Interface.getName() === 'Interface');
                assert(js.lang.Exception.getName() === 'Exception');

                assert(js.partial.foreach() === 'foreach');
                assert(js.partial.format()  === 'format');
                assert(js.partial.option()  === 'option');
                assert(js.partial.printf()  === 'printf');

                assert(js.util.Parser.getName() === 'Parser');
                assert(js.util.Tester.getName() === 'Tester');

                assert(typeof js.util.parser === 'object');
                assert(js.util.parser.Extensions.getName() === 'Extensions');

                assert(typeof js.util.tester === 'object');
                assert(js.util.tester.Exceptions.getName() === 'Exceptions');

                assert(typeof js.util.tester.exceptions === 'object');
                assert(js.util.tester.exceptions.ArgException.getName()    === 'ArgException');
                assert(js.util.tester.exceptions.TesterException.getName() === 'TesterException');
                assert(js.util.tester.exceptions.ValueException.getName()  === 'ValueException');

                assert(js.web.HTTP.getName()       === 'HTTP');
                assert(js.web.JSON.getName()       === 'JSON');
                assert(js.web.YAMLHelper.getName() === 'YAMLHelper');
            }
        },
    }
};
