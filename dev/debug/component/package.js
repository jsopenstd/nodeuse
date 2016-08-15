'use strict';

const node_fs   = require('fs'),
      node_path = require('path');

const coutput = require('./output');

const PACKAGE_JSON_NAME = 'package.json';

let packageRootDir = null;

/**
 * @returns {string}
 */
function getPackageRootDir() {
    if (packageRootDir === null) {

        let dirName = __dirname,
            filePath,
            currentDir;

        for (;;) {
            filePath   = node_path.normalize(dirName + '/' + PACKAGE_JSON_NAME);
            currentDir = dirName;

            //log(filePath);

            if (node_fs.existsSync(filePath)) {
                //log(`exists on`, filePath);
                break;
            }

            dirName = node_path.normalize(dirName + '/..');

            if (currentDir === dirName) {
                //log(`currentDir === dirName, exit`, dirName);
                throw new Error('Could not determine project root, package.json not found in the current directory or in the directories above.');
            }
        }

        packageRootDir = node_path.normalize(currentDir);
    }

    return packageRootDir;
}

/**
 *
 * @param {string} path
 *
 * @returns {boolean}
 */
function isPackagePath(path) {
    let packageUsePattern = /^\/\//;

    return packageUsePattern.test(path);
}

/**
 *
 *
 * @param {string}  path
 *
 * @returns {*}
 */
function processPackagePath(path) {

    // remove packagePath prefix
    path = path.substr(2);

    let fullPath = node_path.normalize(getPackageRootDir() + '/' + path);

    return coutput.package(fullPath);
}

module.exports = {
    getPackageRootDir,
    isPackagePath,
    processPackagePath
};
