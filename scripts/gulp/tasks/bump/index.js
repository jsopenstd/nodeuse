const gulp     = require('gulp'),
      sequence = require("gulp-sequence"),
      debug    = require('gulp-debug'),
      semver   = require('semver'),
      fs       = require('fs');

const MAJOR = 1,
      MINOR = 2,
      PATCH = 3;

var bumpType;

var _nextVersion;

function getNextVersion() {
    var ver;

    if ( ! _nextVersion) {
        ver = require('../../../../package.json').version;

        switch (bumpType) {
            case MAJOR :
                ver = semver.inc(ver, 'major');
                break;

            case MINOR :
                ver = semver.inc(ver, 'minor');
                break;

            case PATCH :
                ver = semver.inc(ver, 'patch');
                break;
        }

        _nextVersion = ver;
    }

    return _nextVersion;
}

gulp.task(
    'tasks/bump.set-bump-major',
    function(cb) {
        bumpType = MAJOR;
        cb();
    }
);

gulp.task(
    'tasks/bump.set-bump-minor',
    function(cb) {
        bumpType = MINOR;
        cb();
    }
);

gulp.task(
    'tasks/bump.set-bump-patch',
    function(cb) {
        bumpType = PATCH;
        cb();
    }
);

gulp.task(
    'tasks/bump.package_json',
    function(cb) {
        var path = '/vagrant/package.json';
        var package_json = require(path);

        package_json.version = getNextVersion();

        var data = JSON.stringify(package_json, null, 2);

        // add new line to the end of the file by adding to the data
        data += '\n';

        fs.writeFileSync(path, data);

        cb();
    }
);

gulp.task(
    'tasks/bump.src',
    function(cb) {
        bumpType = MAJOR;

        var path = '/vagrant/src/js-lang-exception.js';
        var version = getNextVersion();
        var src = fs.readFileSync(
                path,
                {
                    encoding : 'utf8'
                }
            );

        var pattern = /\* @version [\d.]+/;
        src = src.replace(pattern, '* @version ' + version);

        fs.writeFileSync(path, src);

        cb();
    }
);

gulp.task(
    'tasks/bump.bump-files',
    function(cb) {
        sequence(
            'tasks/bump.package_json',
            'tasks/bump.src'
        )(cb);
    }
);

gulp.task(
    'tasks/bump-major',
    function(cb) {
        sequence(
            'tasks/bump.set-bump-major',
            'tasks/bump.bump-files'
        )(cb);
    }
);

gulp.task(
    'tasks/bump-minor',
    function(cb) {
        sequence(
            'tasks/bump.set-bump-minor',
            'tasks/bump.bump-files'
        )(cb);
    }
);

gulp.task(
    'tasks/bump-patch',
    function(cb) {
        sequence(
            'tasks/bump.set-bump-patch',
            'tasks/bump.bump-files'
        )(cb);
    }
);
