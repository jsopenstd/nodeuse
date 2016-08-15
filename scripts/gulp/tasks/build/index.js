'use strict';

const gulp       = require('gulp'),
      remove     = require('del'),
      intercept  = require('gulp-intercept'),
      merge      = require('merge2'),
      compressor = require('gulp-uglify'),
      header     = require('gulp-header'),
      rename     = require('gulp-rename'),
      sequence   = require('gulp-sequence'),
      debug      = require('gulp-debug'),
      log        = console.log.bind(console);

const DEBUG_PATTERN      = /\n\s*?\/\*\* @debug \*\/[\s\S]*?\/\*\*\*\//g,
      ISOLATION_PATTERN  = /\n\s*?\/\*\* @isolation \*\/[\s\S]*?\/\*\*\*\//g,
      PRODUCTION_PATTERN = /\n\s*?\/\*\* @production \*\/[\s\S]*?\/\*\*\*\//g;

const PRODUCTION_CLEANUP_PATTERN = /(?:\/\*\* @production \*\/\n\s*)|(?:\n\s*\/\*\*\*\/)/g;

gulp.task(
    'tasks/build.clear',
    (cb) => {
        remove.sync(
            [
                '../../cov',
                '../../dist',
                '../../dev'
            ],
            {
                force : true
            }
        );

        cb();
    }
);

gulp.task(
    'tasks/build.debug',
    () => {
        return gulp
            .src('../../src/**/*.js')
            .pipe(intercept(
                (file) => {
                    let content = file.contents.toString();

                    // remove isolation and production blocks
                    content = content.replace(ISOLATION_PATTERN, '')
                                     .replace(PRODUCTION_PATTERN, '');

                    file.contents = new Buffer(content);

                    return file;
                }
            ))
            .pipe(
                gulp.dest('../../dev/debug')
            );
    }
);

gulp.task(
    'tasks/build.isolation',
    () => {
        return gulp
            .src('../../src/**/*.js')
            .pipe(intercept(
                (file) => {
                    let content = file.contents.toString();

                    // remove debug and production blocks
                    content = content.replace(DEBUG_PATTERN, '')
                                     .replace(PRODUCTION_PATTERN, '');

                    file.contents = new Buffer(content);

                    return file;
                }
            ))
            .pipe(
                gulp.dest('../../dev/isolation')
            );
    }
);

gulp.task(
    'tasks/build.production',
    () => {
        return gulp
            .src('../../src/**/*.js')
            .pipe(intercept(
                (file) => {
                    let content = file.contents.toString();

                    // remove debug and isolation blocks
                    content = content.replace(DEBUG_PATTERN, '')
                                     .replace(ISOLATION_PATTERN, '');

                    // clean up production block signatures
                    content = content.replace(PRODUCTION_CLEANUP_PATTERN, '');

                    file.contents = new Buffer(content);

                    return file;
                }
            ))
            .pipe(
                gulp.dest('../../dist')
            );
    }
);

gulp.task(
    'tasks/build.build',
    () => {
        return gulp
            .src('../../src/**/*.js')
            .pipe(debug())
            .pipe(
                gulp.dest('../../dist')
            );
    }
);

gulp.task(
    'tasks/build',
    (cb) => {
        sequence(
            'tasks/build.clear',
            'tasks/build.debug',
            'tasks/build.isolation',
            'tasks/build.production'
        )(cb);
    }
);

gulp.task(
    'tasks/build.watch',
    [
        'tasks/build'
    ],
    () => {
        return gulp.watch(
            '../../src/**/*.js',
            [
                'tasks/build'
            ]
        );
    }
);
