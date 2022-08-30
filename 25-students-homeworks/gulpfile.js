const {src, dest, series, parallel, watch} = require('gulp');
const concat = require('gulp-concat');
const clean = require('gulp-clean');
const uglify = require('gulp-uglify');
const browserSync = require('browser-sync').create();

function creanDestTask() {
  return src('./dest', { read: false, allowEmpty: true }).pipe(clean());
};

function copyJs() {
  return src([
    './src/StudentsApi.js',
    './src/model/Collection.js',
    './src/view/StudentsTableView.js',
    './src/view/StudentsInfoView.js',
    './src/view/StudentsFormView.js',
    './src/controller/Controller.js',
    './src/app.js',
  ], { sourcemaps: true })
    .pipe(concat('app.js'))
    .pipe(uglify())
    .pipe(dest('./dest', { sourcemaps: '.' }));
};

function copyVendorJs() {
  return src('./node_modules/jquery/dist/jquery.min.js')
    .pipe(concat('vendor.js'))
    .pipe(dest('./dest'));
};

function copyHtml() {
  return src('./src/index.html').pipe(dest('./dest'));
};

function copyCss() {
  return src('./src/app.css').pipe(dest('./dest'));
};

function serve() {
  browserSync.init({
    server: {
      baseDir: "./dest"
    }
  });

  watch(['./src/**/*.js'], { ignoreInitial: false }, series(copyJs, reloadBrowser));
  watch(['./src/*.css'], { ignoreInitial: false }, series(copyCss, reloadBrowser));
  watch(['./src/*.html'], { ignoreInitial: false }, series(copyHtml, reloadBrowser));
};

function reloadBrowser(done) {
  browserSync.reload();
  done();
};

function taskBuild() {
  return series(
    creanDestTask,
    parallel(
      copyJs,
      copyHtml,
      copyCss,
      copyVendorJs
    ),
  );
};

function taskServe() {
  return series(taskBuild(), serve);
}

module.exports.build = taskBuild();
module.exports.serve = taskServe();
