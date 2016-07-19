// Dependencies
var del                = require('del');
var gulp               = require('gulp');
var autoprefixer       = require('gulp-autoprefixer');
var imagemin           = require('gulp-imagemin');
var pngquant           = require('imagemin-pngquant');
var minify             = require('gulp-minify-css');
var concat             = require('gulp-concat');
var cache              = require('gulp-cache');
var sass               = require('gulp-ruby-sass');
var shell              = require('gulp-shell');
var uglify             = require('gulp-uglify');
var gutil              = require('gulp-util');
var browserSync        = require('browser-sync').create();
var scsslint           = require('gulp-scss-lint');
var size               = require('gulp-size');
var runSequence        = require('run-sequence');
var plumber            = require('gulp-plumber');

var config             = require('../config');

// Delete
gulp.task('delete', function(cb) {
    del(config.delete.src, cb);
});

// Clear Cache
gulp.task("clear", ["delete"], function() {
  return cache.clearAll(done);
});


// SASS
gulp.task('sass', function() {
  var sassConfig = config.sass.options;

  sassConfig.onError = browserSync.notify;

  browserSync.notify('Compiling Sass');

  return plumber()
    .pipe(sass(config.sass.src,sassConfig))
    .pipe(autoprefixer(config.autoprefixer))
    .pipe(minify())
    .pipe(gulp.dest(config.sass.dest))
    .pipe(size())
    .pipe(browserSync.stream());
});

gulp.task('scsslint', function() {
  return gulp.src(config.sass.src)
    .pipe(scsslint(config.options));
});

// Scripts
gulp.task('scripts', function() {
    return gulp.src(config.scripts.src)
    .pipe(concat('app.js'))
    .pipe(uglify())
    .pipe(gulp.dest(config.scripts.dest))
    .pipe(size());
});

gulp.task('jshint', function() {
  return gulp.src(config.scripts.src)
    .pipe(jshint())
});

// Images
gulp.task('images', function() {
    return gulp.src(config.images.src)
    .pipe(cache(
      imagemin({
        optimizationLevel: 3,
        progressive: true,
        interlaced: true,
        svgoPlugins: [{
          removeViewBox: false
        }],
        use: [
          pngquant()
      ]
    })))
    .pipe(gulp.dest(config.images.dest));
});

// Static files
gulp.task('copy:files', ['copy:fonts', 'copy:videos', 'copy:html']);

  gulp.task('copy:fonts', function() {
    return gulp.src(config.copyfiles.fonts.src)
      .pipe(gulp.dest(config.copyfiles.fonts.dest));
  });

  gulp.task('copy:videos', function() {
    return gulp.src(config.copyfiles.videos.src)
      .pipe(gulp.dest(config.copyfiles.videos.dest));
  });

  gulp.task('copy:html', function() {
    return gulp.src(config.copyfiles.html.src)
      .pipe(gulp.dest(config.copyfiles.html.dest));
  });

// Build
gulp.task('build', function(callback) {
  runSequence('delete',
  [
    'sass',
    'scripts',
    'images',
    'copy:files'
  ],
  callback);
});

// Browsersync
gulp.task('browsersync', ['build'], function() {
  browserSync.init(config.browsersync);
  gulp.watch(config.overlord).on("change", browserSync.reload);
});

// Watch
gulp.task("watch", ['browsersync'], function() {
  gulp.watch(config.watch.sass,       ['sass', 'scsslint']);
  gulp.watch(config.watch.scripts,    ['scripts', 'jshint']);
  gulp.watch(config.watch.images,     ['images']);
  gulp.watch(config.watch.html,       ['copy:files']);
});

// Default
gulp.task("default", ["watch"]);
