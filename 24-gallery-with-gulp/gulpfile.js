const {src, dest, series, watch} = require('gulp');
const concat = require('gulp-concat');
const clean = require('gulp-clean');
const uglify = require('gulp-uglify');

function creanDestTask() {
  return src('./dest', { read: false, allowEmpty: true }).pipe(clean());
};

function copyJs() {
  return src([
    './src/AlbumApi.js',
    './src/script.js',
  ], { sourcemaps: true })
    .pipe(concat('script.js'))
    .pipe(uglify())
    .pipe(dest('./dest', { sourcemaps: true }));
};

function copyHtml() {
  return src('./src/index.html').pipe(dest('./dest'));
};

function copyCss() {
  return src('./src/style.css').pipe(dest('./dest'));
};

function watchFiles() {
 return watch(['./src/**/*.js'], { ignoreInitial: false }, () => copyJs());
};

module.exports.build = series(creanDestTask, copyJs, copyHtml, copyCss);
module.exports.serve = series(creanDestTask, copyJs, copyHtml, copyCss, watchFiles);
