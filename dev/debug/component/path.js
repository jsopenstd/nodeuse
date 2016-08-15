const node_fs   = require('fs'),
      node_path = require('path');

/**
 *
 * @param {...string} args
 *
 * @returns {string}
 */
function normalize(...args) {
    let path = '';

    for (let i = 0, len = args.length; i < len; i++) {
        path += args[i];
    }

    let normalizedPath = node_path.normalize(path);

    if (normalizedPath === '.') {
        normalizedPath = '';
    }

    if (/^\s+$/.test(normalizedPath)) {
        normalizedPath = '';
    }

    return normalizedPath;
}

/**
 *
 * @param {...string} args
 *
 * @returns {boolean}
 */
function exists(...args) {
    let path = normalize.apply(null, args);

    if (path === '') {
        return false;
    }

    return node_fs.existsSync(path);
}

/**
 *
 * @param {string} path
 *
 * @returns {boolean}
 */
function isEmpty(path) {
    if ( ! path) {
        return true;
    }

    if (/^(\/\/)?\s*$/.test(path)) {
        return true;
    }

    return false;
}

/**
 *
 * @param {string} path
 *
 * @returns {boolean}
 */
function isInvalid(path) {
    if ( ! path) {
        return true;
    }

    let allowedCharacters = /^(\/\/)?[\w\.\-\/\*]+$/;

    if ( ! allowedCharacters.test(path)) {
        return true;
    }

    return false;
}

/**
 * @param {string} path
 *
 * @returns {boolean}
 */
function isFile(path) {
    if ( ! path) {
        return false;
    }

    if (node_fs.statSync(path).isFile()) {
        return true;
    }

    return false;
}

/**
 * @param {string} path
 *
 * @returns {boolean}
 */
function isDirectory(path) {
    if ( ! path) {
        return false;
    }

    if (node_fs.statSync(path).isDirectory()) {
        return true;
    }

    return false;
}

module.exports = {
    isEmpty,
    isInvalid,
    isFile,
    isDirectory,
    normalize,
    exists
};
