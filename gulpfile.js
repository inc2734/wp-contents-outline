'use strict';

var gulp   = require('gulp');
var rimraf = require('rimraf');

var dir = {
  src: {
    packages: 'node_modules'
  },
  dist: {
    packages: 'src/assets/packages'
  }
}

/**
 * Remove directory for copied node modules
 */
gulp.task('remove-packages-dir', function(cb) {
  rimraf(dir.dist.packages, cb);
});

/**
 * Copy dependencies node modules to src directory
 */
gulp.task('packages', gulp.series('remove-packages-dir', function(cb) {
  var packages = [
    dir.src.packages + '/jquery.contents-outline/**'
  ];
  return gulp.src(packages, {base: 'node_modules'})
    .pipe(gulp.dest(dir.dist.packages));
}));

/**
 * Build
 */
gulp.task('build', gulp.series('packages'));
