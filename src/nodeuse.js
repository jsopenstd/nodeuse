'use strict';

const node_fs   = require('fs'),
      node_path = require('path');

const cpath    = require('./component/path'),
      cpackage = require('./component/package'),
      cmodule  = require('./component/module');

const log = console.log.bind(console);

/**
 *
 * @param {string} path
 *
 * @returns {*}
 */
module.exports = (path) => {
    if (cpath.isEmpty(path)) {
        throw new Error(`Path is empty: "${path}"`);
    }

    if (cpath.isInvalid(path)) {
        throw new Error(`Invalid path: "${path}"`);
    }

    if (cpackage.isPackagePath(path)) {
        return cpackage.processPackagePath(path);

    } else {
        return cmodule.processModulePath(path);
    }
};
