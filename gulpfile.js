var gulp = require('gulp');
var exec = require('child_process').exec;
var runSequence = require('run-sequence');
var fs = require('fs');

// http://stackoverflow.com/a/32197381
var deleteFolderRecursive = function (path) {
    if (fs.existsSync(path)) {
        fs.readdirSync(path).forEach(function (file, index) {
            var curPath = path + "/" + file;
            if (fs.lstatSync(curPath).isDirectory()) { // recurse
                deleteFolderRecursive(curPath);
            } else { // delete file
                fs.unlinkSync(curPath);
            }
        });
        fs.rmdirSync(path);
    }
};

gulp.task('lint', function (callback) {
    exec('npm run lint').on('close', function (code) {
        if (code) {
            throw new Error("npm run lint problem!");
        }

        callback();
    });
});

gulp.task('build', function (callback) {
    deleteFolderRecursive('lib');
    exec('tsc').on('close', function (code) {
        if (code) {
            throw new Error("tsc build problem!");
        }

        callback();
    });
});

gulp.task('docs', function (callback) {
    exec('npm run docs').on('close', function (code) {
        if (code) {
            throw new Error("npm run docs problem!");
        }

        callback();
    });
});

gulp.task('update-npm', function (callback) {
    exec('npm update --save').on('close', function (code) {
        if (code) {
            throw new Error("npm update problem!");
        }

        exec('npm update --save-dev').on('close', function (code) {
            if (code) {
                throw new Error("npm update dev problem!");
            }

            callback();
        });
    });
});

gulp.task('update-typings', function (callback) {
    exec('npm run typings').on('close', function (code) {
        if (code) {
            throw new Error("npm run typings problem!");
        }

        callback();
    });

});

gulp.task('test', function (callback) {
    exec('npm run test').on('close', function (code) {
        if (code) {
            throw new Error("npm run test problem!");
        }

        callback();
    });

});

gulp.task('update', function (callback) {
    runSequence(['update-npm', 'update-typings'], callback);
});

gulp.task('default', function (callback) {
    runSequence('update', 'lint', ['build', 'docs'], 'test', callback);
});
