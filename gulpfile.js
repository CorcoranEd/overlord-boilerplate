// Dependencies
var livereload = require('connect-livereload'),
	express = require('express'),
	gulp = require('gulp'),
	autoprefixer = require('gulp-autoprefixer'),
    imagemin = require('gulp-imagemin'),
	concat = require('gulp-concat'),
    cache = require('gulp-cache'),
	rename = require('gulp-rename'),
    sass = require('gulp-sass'),
    shell = require('gulp-shell'),
    uglify = require('gulp-uglify'),
	gutil = require('gulp-util'),
	tinylr = require('tiny-lr');

// Variables
var express_port = 8888,
	express_root = __dirname + '/dist/',
	lr = void 0,
	livereload_port = 35729,
	dist = { html: "dist/", js: "dist/js/", css: "dist/css/", img: "dist/img/" },
	src = { sass: "src/sass/base.scss", js: "src/js/**/*.js", img: "src/img/**/*.{jpg,svg,png}", overlord: "dist/**/*.{js,html,css}" },
	stat = [ "src/*.html", "src/*.ico" ];

// Server
gulp.task('serve', function(event) {
	// Server start console message
	gutil.log.apply(gutil, [gutil.colors.black.bgCyan(' (ಠ_ಠ) The overlord is serving your site on http://localhost:' + express_port + ' ')]);

	var app;
	app = express();
	app.use(livereload());
	app.use(express.static(express_root));
	app.listen(express_port);

	lr = tinylr();
	lr.listen(livereload_port, function() {
	  gutil.log.apply(gutil, [gutil.colors.black.bgCyan(' (ಠ_ಠ) The overlord is watching you on port ' + livereload_port + ' ')]);
	})
});

// Reload
var refresh = function(event) {
	var fileName;
	fileName = require('path').relative(express_root, event.path);

	gutil.log.apply(gutil, [gutil.colors.black.bgCyan(' (ಠ_ಠ) '), gutil.colors.magenta(fileName), gutil.colors.cyan('changed')]);

	return lr.changed({
		body: {
			files: [fileName]
		}
	});
};

// SASS
gulp.task("sass", function(event) {
	return gulp.src(src.sass)
	.pipe(sass({ outputStyle: 'compressed' }))
	.pipe(autoprefixer('last 2 version', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1', 'ios 6', 'android 4'))
    .pipe(rename({ suffix: '.min' }))
	.pipe(gulp.dest(dist.css));
});

// JS
gulp.task('js', function(event) {
    return gulp.src(src.js)
    .pipe(concat('app.js'))
    .pipe(rename({ suffix: '.min' }))
    .pipe(uglify())
    .pipe(gulp.dest(dist.js));
});

// IMG
gulp.task('img', function(event) {
    return gulp.src(src.img)
    .pipe(cache(imagemin({ optimizationLevel: 3, progressive: true, interlaced: true })))
    .pipe(gulp.dest(dist.img));
});

// Static
gulp.task('copy', function() {
  return gulp.src(stat, {base: 'src/'})
    .pipe(gulp.dest(dist.html))
});

// Watch
gulp.task("watch", function() {
	gulp.watch(src.sass, ["sass"]);
	gulp.watch(src.js, ["js"]);
	gulp.watch(stat, ["copy"]);
	gulp.watch(src.overlord, refresh);
});

//Browser
gulp.task('browser', shell.task(['open http://localhost:8888']));

// Default task
gulp.task("default", ["serve", "sass", "js", "img", "copy", "watch", "browser"]);
