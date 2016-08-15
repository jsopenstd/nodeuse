'use strict';

const gulp     = require('gulp'),
      mocha    = require('gulp-mocha'),
      coverage = require('gulp-istanbul'),
      sequence = require("gulp-sequence"),
      lint     = require('gulp-eslint'),
      debug    = require('gulp-debug'),
      vars     = require('../../../../tests/variables');

let source = '';

gulp.task(
    'tasks/test.base',
    () => {
        return gulp
            .src(
                source,
                {
                    read : false
                }
            )
            .pipe(
                mocha({
                    ui : 'exports'
                })
            );
    }
);

gulp.task(
    'tasks/test.setup.debug',
    (cb) => {
        vars.isDebug     = true;
        vars.isIsolation = false;

        vars.nodeuse = '../../dev/debug/nodeuse.js';

        vars.component.file   = '../../../../dev/debug/component/file.js';
        vars.component.module = '../../../../dev/debug/component/module.js';
        vars.component.path   = '../../../../dev/debug/component/path.js';

        cb();
    }
);

gulp.task(
    'tasks/test.setup.isolation',
    (cb) => {
        vars.isDebug     = false;
        vars.isIsolation = true;

        vars.nodeuse = '../../dev/isolation/nodeuse.js';

        vars.component.file   = '../../../../dev/isolation/component/file.js';
        vars.component.module = '../../../../dev/isolation/component/module.js';
        vars.component.path   = '../../../../dev/isolation/component/path.js';

        cb();
    }
);

gulp.task(
    'tasks/test.setup.component/file',
    (cb) => {
        source = '../../tests/cases/component/file/*.test.js';
        cb();
    }
);

gulp.task(
    'tasks/test.setup.component/path',
    (cb) => {
        source = '../../tests/cases/component/path/*.test.js';
        cb();
    }
);

gulp.task(
    'tasks/test.setup.component/module',
    (cb) => {
        source = '../../tests/cases/component/module/*.test.js';
        cb();
    }
);

gulp.task(
    'tasks/test.setup.nodeuse',
    (cb) => {
        source = '../../tests/cases/*.test.js';
        cb();
    }
);

gulp.task(
    'tasks/test.debug.component/file',
    (cb) => {
        sequence(
            'tasks/test.setup.debug',
            'tasks/test.setup.component/file',
            'tasks/test.base'
        )(cb);
    }
);

gulp.task(
    'tasks/test.debug.component/module',
    (cb) => {
        sequence(
            'tasks/test.setup.debug',
            'tasks/test.setup.component/module',
            'tasks/test.base'
        )(cb);
    }
);

gulp.task(
    'tasks/test.debug.component/path',
    (cb) => {
        sequence(
            'tasks/test.setup.debug',
            'tasks/test.setup.component/path',
            'tasks/test.base'
        )(cb);
    }
);

gulp.task(
    'tasks/test.debug.nodeuse',
    (cb) => {
        sequence(
            'tasks/test.setup.debug',
            'tasks/test.setup.nodeuse',
            'tasks/test.base'
        )(cb);
    }
);

gulp.task(
    'tasks/test.isolation.component/file',
    (cb) => {
        sequence(
            'tasks/test.setup.isolation',
            'tasks/test.setup.component/file',
            'tasks/test.base'
        )(cb);
    }
);

gulp.task(
    'tasks/test.isolation.component/module',
    (cb) => {
        sequence(
            'tasks/test.setup.isolation',
            'tasks/test.setup.component/module',
            'tasks/test.base'
        )(cb);
    }
);

gulp.task(
    'tasks/test.isolation.component/path',
    (cb) => {
        sequence(
            'tasks/test.setup.isolation',
            'tasks/test.setup.component/path',
            'tasks/test.base'
        )(cb);
    }
);

gulp.task(
    'tasks/test.isolation.nodeuse',
    (cb) => {
        sequence(
            'tasks/test.setup.isolation',
            'tasks/test.setup.nodeuse',
            'tasks/test.base'
        )(cb);
    }
);

gulp.task(
    'tasks/test.debug',
    (cb) => {
        sequence(
            'tasks/test.debug.component/file',
            'tasks/test.debug.component/module',
            'tasks/test.debug.component/path',
            'tasks/test.debug.nodeuse'
        )(cb);
    }
);

gulp.task(
    'tasks/test.isolation',
    (cb) => {
        sequence(
            'tasks/test.isolation.component/file',
            'tasks/test.isolation.component/module',
            'tasks/test.isolation.component/path',
            'tasks/test.isolation.nodeuse'
        )(cb);
    }
);

gulp.task(
    'tasks/test.lint',
    () => {
        return gulp
            .src('../../dist/**/*.js')
            .pipe(lint())
            .pipe(lint.format())
            .pipe(lint.failAfterError());
    }
);

gulp.task(
    'tasks/test',
    (cb) => {
        sequence(
            'tasks/test.debug',
            'tasks/test.isolation'
            //'tasks/test.lint'
        )(cb);
    }
);

/*
gulp.task(
    'tasks/test',
    (cb) => {
        sequence(
            'tasks/test/component/file',
            'tasks/test/component/module',
            'tasks/test/component/path',
            'tasks/test/nodeuse'
        )(cb);
    }
);
*/

/*
gulp.task(
    'tasks/test-src',
    function() {
        vars.path = '../src/js-lang-exception.js';

        return gulp
            .src(
                '../../tests/tests.js',
                {
                    read : false
                }
            )
            .pipe(
                mocha({
                    ui : 'exports'
                })
            );
    }
);

gulp.task(
    'tasks/test-dist-dev',
    function() {
        vars.path = '../dist/js-lang-exception.js';

        return gulp
            .src(
                '../../tests/tests.js',
                {
                    read : false
                }
            )
            .pipe(
                mocha({
                    ui : 'exports'
                })
            );
    }
);

gulp.task(
    'tasks/test-dist-prod',
    function() {
        vars.path = '../dist/js-lang-exception.min.js';

        return gulp
            .src(
                '../../tests/tests.js',
                {
                    read : false
                }
            )
            .pipe(
                mocha({
                    ui : 'exports'
                })
            );
    }
);

gulp.task(
    'tasks/test.init-cov',
    function() {
        return gulp
            .src('../../src/js-lang-exception.js')
            .pipe(coverage())
            .pipe(coverage.hookRequire());
    }
);

gulp.task(
    'tasks/test-src-with-cov',
    [
      'tasks/test.init-cov'
    ],
    function() {
        vars.path = '../src/js-lang-exception.js';

        return gulp
            .src(
                '../../tests/tests.js',
                {
                    read : false
                }
            )
            .pipe(
                mocha({
                    ui : 'exports'
                })
            )
            .pipe(
                coverage.writeReports({
                    dir : '../../cov'
                })
            )
            .pipe(
                coverage.enforceThresholds({
                    thresholds : {
                        global : 100 // enforce 100% coverage
                    }
                }
            ));
    }
);

gulp.task(
    'tasks/test-src-with-lint',
    [
        'tasks/test-src'
    ],
    function() {
        return gulp
            .src('../../src/js-lang-exception.js')
            .pipe(lint())
            .pipe(lint.format())
            .pipe(lint.failAfterError());
    }
);

gulp.task(
    'tasks/test',
    function(cb) {
        sequence(
            'tasks/test-dist-dev',
            'tasks/test-dist-prod',
            'tasks/test-src-with-cov',
            'tasks/test-src-with-lint'
        )(cb);
    }
);
*/
