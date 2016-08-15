'use strict';

const node_fs   = require('fs'),
      node_path = require('path');

const glob = require('glob');

const coutput  = require('./output'),
      cpackage = require('./package');

const NODE_MODULES_DIR = 'node_modules';

const PARTIAL_INCLUDE   = /^[0-9a-z\.]+\.partial\.[0-9a-zA-Z-]+$/,
      MODULE_INCLUDE    = /^[0-9a-z\.]+\.[A-Z]+[0-9a-zA-Z]+$/,
      NAMESPACE_INCLUDE = /^[0-9a-z\.]+\*$/;

const log = console.log.bind(console);


/**
 *
 * @param {string} path
 *
 * @returns {boolean}
 */
function isPartialInclude(path) {
    if ( ! path) {
        return false;
    }

    return PARTIAL_INCLUDE.test(path);
}

/**
 *
 * @param {string} path
 *
 * @returns {boolean}
 */
function isModuleInclude(path) {
    if ( ! path) {
        return false;
    }

    return MODULE_INCLUDE.test(path);
}

/**
 *
 * @param {string} path
 *
 * @returns {boolean}
 */
function isNamespaceInclude(path) {
    if ( ! path) {
        return false;
    }

    return NAMESPACE_INCLUDE.test(path);
}

/**
 *
 * @param {string} path
 *
 * @returns {string}
 */
function convertPartialPath(path) {
    if ( ! path) {
        return '';
    }

    return path;
}

/**
 *
 * @param {string} path
 *
 * @returns {string}
 */
function convertModulePath(path) {
    if ( ! path) {
        return '';
    }

    let parts     = path.split('.'),
        namePart  = parts[parts.length - 1],
        converted = '';

    let convertedName = namePart.replace(
        /[A-Z]/g,
        (letter) => {
            return '-' + letter.toLowerCase();
        }
    );

    // the last part is not needed hence the parts.length - 1
    for (let i = 0, len = parts.length - 1; i < len; i++) {
        converted += parts[i] + '.';
    }

    // strip 1st dash from convertedName
    return converted + convertedName.substr(1);
}

/**
 *
 * @param {string} path
 *
 * @returns {string}
 */
function convertIncludePath(path) {
    if ( ! path) {
        return '';
    }

    let namePart = path.match(/[0-9a-z-]+$/);

    namePart = namePart[0];

    // convert 1st letter to uppercase (e.g.: module => Module)
    namePart = namePart.charAt(0).toUpperCase() + namePart.substr(1);

    let converted = namePart.replace(
        /-[a-z]/g,
        (dashLetter) => {
            // strip the leading dash ('-') and convert the letter to uppercase
            return dashLetter.charAt(1).toUpperCase();
        }
    );

    let lastIndex = path.lastIndexOf('.');

    return path.substring(0, lastIndex + 1) + converted;
}

function getGlobNamespacesForIncludeTree(glob) {
    let globInclude = glob.match(/[0-9a-z-*\.]+$/),
        parts       = globInclude[0].split('.');

    return parts.slice(0, -1);
}

/**
 *
 * @param {string[]} globNamespaces
 * @param {string}   path
 *
 * @returns {string[]|null}
 */
function getNamespacesForIncludeTree(globNamespaces, path) {
    let moduleDir   = path.match(/[0-9a-z-\.]+$/),
        parts       = moduleDir[0].split('.'),
        offsetIndex = globNamespaces.length;

    parts = parts.slice(offsetIndex, -1);

    if (parts.length === 0) {
        return null;
    }

    return parts;
}

/**
 *
 * @param {string} path
 *
 * @returns {string}
 */
function getNameForIncludeTree(path) {
    let moduleName = path.match(/[0-9a-z-]+$/);

    moduleName = moduleName[0];

    //log(path);

    let namePart;

    // if it is a partial
    if (path.indexOf('partial.') > -1) {
        namePart = moduleName;

    } else {
        // convert 1st letter to uppercase (e.g.: module => Module)
        namePart = moduleName.charAt(0).toUpperCase() + moduleName.substr(1);
    }

    /*
    // convert 1st letter to uppercase (e.g.: module => Module)
    let namePart = moduleName.charAt(0).toUpperCase() + moduleName.substr(1);
    */

    let converted = namePart.replace(
        /-[a-z]/g,
        (dashLetter) => {
            // strip the leading dash ('-') and convert the letter to uppercase
            return dashLetter.charAt(1).toUpperCase();
        }
    );

    return converted;
}

/**
 *
 * @param {string}   glob
 * @param {string[]} modules
 *
 * @returns {Object}
 */
function buildIncludeTree(glob, modules) {

    let baseNamespace  = {},
        globNamespaces = getGlobNamespacesForIncludeTree(glob);

    for (let i = 0, len = modules.length; i < len; i++) {

        let path           = modules[i],
            namespaces     = getNamespacesForIncludeTree(globNamespaces, path),
            name           = getNameForIncludeTree(path),
            requiredModule = coutput.module(path);

        if ( ! namespaces) {
            baseNamespace[name] = requiredModule;

        } else {
            let namespace = baseNamespace;

            for (let j = 0, jlen = namespaces.length; j < jlen; j++) {
                let ns = namespaces[j];

                if ( ! (ns in namespace)) {
                    namespace[ns] = {};
                    namespace = namespace[ns];
                } else {
                    namespace = namespace[ns];
                }
            }

            namespace[name] = requiredModule;
        }
    }

    return baseNamespace;
}

/**
 *
 * @param {string} path
 *
 * @returns {string}
 */
function convertUsePathToModulePath(path) {
    let parts     = path.split('.'),
        namePart  = parts[parts.length - 1],
        converted = '';

    let convertedName = namePart.replace(
        /[A-Z]/g,
        (letter) => {
            return '-' + letter.toLowerCase();
        }
    );

    // the last part is not needed hence the parts.length - 1
    for (let i = 0, len = parts.length - 1; i < len; i++) {
        converted += parts[i] + '-';
    }

    // strip 1st dash from convertedName
    return converted + convertedName.substr(1);
}

/**
 *
 * @param {string} path
 *
 * @returns {string}
 */
function convertModulePathToUseModuleName(path) {

    let namePart = path.match(/[0-9a-z-]+$/);

    namePart = namePart[0];

    // convert 1st letter to uppercase (e.g.: module => Module)
    namePart = namePart.charAt(0).toUpperCase() + namePart.substr(1);

    let converted = namePart.replace(
        /-[a-z]/g,
        (dashLetter) => {
            // strip the leading dash ('-') and convert the letter to uppercase
            return dashLetter.charAt(1).toUpperCase();
        }
    );

    return converted;
}

/**
 *
 * @param {string} path
 *
 * @returns {string}
 */
function convertModuleName(path) {
    let parts     = path.split('.'),
        namePart  = parts[parts.length - 1],
        slices    = namePart.split('-'),
        converted = '';

    for (let i = 0, len = slices.length; i < len; i++) {
        let slice = slices[i];

        converted += slice.substr(0, 1).toUpperCase() + slice.substr(1);
    }

    if (converted === '') {
        throw new Error(`Cannot convert module's name from path: "${path}"`);
    }

    return converted;
}

/**
 *
 * @param {string} packageRootDir
 * @param {string} nodeModulesDir
 * @param {string} partialIncludePath
 *
 * @returns {string}
 */
function getPartialPath(packageRootDir, nodeModulesDir, partialIncludePath) {

    nodeModulesDir = coutput.getModulesDir();

    return node_path.normalize(
        packageRootDir + nodeModulesDir + convertPartialPath(partialIncludePath)
    );
}

/**
 *
 * @param {string} packageRootDir
 * @param {string} nodeModulesDir
 * @param {string} moduleIncludePath
 *
 * @returns {string}
 */
function getRequirePath(packageRootDir, nodeModulesDir, moduleIncludePath) {

    nodeModulesDir = coutput.getModulesDir();

    return node_path.normalize(
        packageRootDir + nodeModulesDir + convertModulePath(moduleIncludePath)
    );
}

/**
 * @returns {string[]}
 */
function getModulePaths(packageRootDir, nodeModulesDir, namespaceIncludePath) {

    nodeModulesDir = coutput.getModulesDir();

    let globPath = node_path.normalize(
        packageRootDir + nodeModulesDir + namespaceIncludePath
    );

    return glob.sync(globPath);
}

/**
 *
 * @param {string}   path
 *
 * @returns {*}
 */
function processModulePath(path) {

    if (PARTIAL_INCLUDE.test(path)) {
        let partialPath = getPartialPath(
            cpackage.getPackageRootDir(),
            NODE_MODULES_DIR,
            path
        );

        return coutput.module(partialPath);
    }

    if (MODULE_INCLUDE.test(path)) {
        let modulePath = getRequirePath(
            cpackage.getPackageRootDir(),
            NODE_MODULES_DIR,
            path
        );

        return coutput.module(modulePath);
    }

    if (NAMESPACE_INCLUDE.test(path)) {
        let modules = getModulePaths(
            cpackage.getPackageRootDir(),
            NODE_MODULES_DIR,
            path
        );

        if (modules.length === 0) {
            throw new Error(`Namespace "${path}" cannot be included, no modules on that path`);
        }

        return buildIncludeTree(path, modules);
    }
}

function getNodeModulesDir() {
    return NODE_MODULES_DIR;
}

module.exports = {
    isModuleInclude,
    isPartialInclude,
    isNamespaceInclude,

    convertModulePath,
    convertIncludePath,

    buildIncludeTree,
    processModulePath,
    getNodeModulesDir,
};
