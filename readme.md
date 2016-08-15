# nodeuse

[![Recent Version][npm-badge]][npm-url]
[![Travis CI - Build Status][travis-badge]][travis-url]
[![Coveralls - Code Coverage Status][cov-badge]][cov-url]
[![David - Dependencies][dep-badge]][dep-url]
[![David - DevDependencies][dev-dep-badge]][dev-dep-url]
[![Doclets][doclets-badge]][doclets-url]
[![Gitter - Repository Chat][chat-badge]][chat-url]

## Synopsis

A generic loader tool to extend Node's native require() function for better structured module and file loading.

Written in **ECMAScript 6**, currently **only Node is supported**, nodeuse is in **early alpha stage**. 

## Install

```
npm install nodeuse
```

## Usage

```javascript
// load a partial from node_modules    
const foreach = use('js.partial.foreach');

// load a package from node_modules    
const Module = use('js.module.Module');

// load packages from node_modules under specific namespace    
const js = use('js.*');

// use files from current package
const pkg = use('//package.json');    
```

## Documentation

Check the source 
[here](https://github.com/jsopenstd/nodeuse/blob/master/src/nodeuse.js)
since it's well structured and documented. Also you can find the rendered jsDoc documentation on 
[Doclets.io](https://doclets.io/jsopenstd/nodeuse/master). 

Also, check the [unit tests](https://github.com/jsopenstd/nodeuse/blob/master/tests/cases) 
in order to grasp the full-fledged capabilities.

Have fun! ;)

## Issues

If you find any bugs and other issues, check the
[GSDC Guide - Issues](https://github.com/openstd/general-software-development-contribution-guide#issues)
section on how to submit issues in a standardized way on
[the project's issues page](https://github.com/jsopenstd/nodeuse/issues).

In case you have any suggestions regarding the project (features, additional capabilities, etc.), check the
[GSDC Guide - Suggestions](https://github.com/openstd/general-software-development-contribution-guide#suggestions)
section on how to submit suggestions in an easy, standardized way on
[the project's issues page](https://github.com/jsopenstd/nodeuse/issues).

## Contribution

In order to contribute to this project, check the
[GSDC Guide](https://github.com/openstd/general-software-development-contribution-guide)
for an easy, standardized way on how to contribute to projects.

## Support

If you **by any means** find this project useful,
[consider supporting the organization](https://github.com/jsopenstd/jsopenstd/blob/master/support.md).

There are multiple options to support the project and the developers.
Any means of support is beneficial and helpful.

## License

[MIT](license.md) @ Richard King

[npm-badge]:     https://img.shields.io/npm/v/nodeuse.svg
[npm-url]:       https://www.npmjs.com/package/nodeuse

[travis-badge]:  https://travis-ci.org/jsopenstd/nodeuse.svg?branch=master
[travis-url]:    https://travis-ci.org/jsopenstd/nodeuse

[cov-badge]:     https://coveralls.io/repos/github/jsopenstd/nodeuse/badge.svg?branch=master
[cov-url]:       https://coveralls.io/github/jsopenstd/nodeuse

[dep-badge]:     https://david-dm.org/jsopenstd/nodeuse.svg
[dep-url]:       https://david-dm.org/jsopenstd/nodeuse

[dev-dep-badge]: https://david-dm.org/jsopenstd/nodeuse/dev-status.svg
[dev-dep-url]:   https://david-dm.org/jsopenstd/nodeuse#info=devDependencies

[doclets-badge]: https://img.shields.io/badge/style-on_doclets-brightgreen.svg?style=flat-square&label=docs
[doclets-url]:   https://doclets.io/jsopenstd/nodeuse/master   

[chat-badge]:    https://badges.gitter.im/jsopenstd/nodeuse.svg
[chat-url]:      https://gitter.im/jsopenstd/nodeuse?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge

[partial-link]:  https://github.com/jsopenstd/jsopenstd/blob/master/readme.md#partial 
[umd-link]:      https://github.com/jsopenstd/jsopenstd/blob/master/readme.md#umd 
