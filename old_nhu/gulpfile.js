"use strict"
var gulp = require('gulp');
var sass = require('gulp-sass');
var header = require('gulp-header');
var cleanCSS = require('gulp-clean-css');
var rename = require("gulp-rename");
var uglify = require('gulp-uglify');
var watchSass = require("gulp-watch-sass");
var pkg = require('./package.json');
var browserSync = require('browser-sync').create();
var fileinclude = require("gulp-file-include");
var replace = require("gulp-replace");
var sourcemaps = require('gulp-sourcemaps');

// Set the banner content
var banner = ['/*!\n',
  ' * Start Bootstrap - <%= pkg.title %> v<%= pkg.version %> (<%= pkg.homepage %>)\n',
  ' * Copyright 2013-' + (new Date()).getFullYear(), ' <%= pkg.author %>\n',
  ' * Licensed under <%= pkg.license %> (https://github.com/BlackrockDigital/<%= pkg.name %>/blob/master/LICENSE)\n',
  ' */\n',
  ''
].join('');

// Copy third party libraries from /node_modules into /vendor
gulp.task('vendor', function() {

  // Bootstrap
  gulp.src([
      './node_modules/bootstrap/dist/**/*',
      '!./node_modules/bootstrap/dist/css/bootstrap-grid*',
      '!./node_modules/bootstrap/dist/css/bootstrap-reboot*'
    ])
    .pipe(gulp.dest('./src/Project/Static/code/vendor/bootstrap'))

  // Font Awesome
  gulp.src([
      './node_modules/font-awesome/**/*',
      '!./node_modules/font-awesome/{less,less/*}',
      '!./node_modules/font-awesome/{scss,scss/*}',
      '!./node_modules/font-awesome/.*',
      '!./node_modules/font-awesome/*.{txt,json,md}'
    ])
    .pipe(gulp.dest('./src/Project/Static/code/vendor/font-awesome'))

  // jQuery
  gulp.src([
      './node_modules/jquery/dist/*',
      '!./node_modules/jquery/dist/core.js'
    ])
    .pipe(gulp.dest('./src/Project/Static/code/vendor/jquery'))

  // jQuery Easing
  gulp.src([
      './node_modules/jquery.easing/*.js'
    ])
    .pipe(gulp.dest('./src/Project/Static/code/vendor/jquery-easing'))

  // Magnific Popup
  gulp.src([
      './node_modules/magnific-popup/dist/*'
    ])
    .pipe(gulp.dest('./src/Project/Static/code/vendor/magnific-popup'))

  // Scrollreveal
  gulp.src([
      './node_modules/scrollreveal/dist/*.js'
    ])
    .pipe(gulp.dest('./src/Project/Static/code/vendor/scrollreveal'))

});

// Compile SCSS
gulp.task('scss', function () {
  return gulp.src('./src/Project/Static/code/scss/**/*.scss')
    .pipe(sourcemaps.init())
    .pipe(sass.sync({
      outputStyle: 'expanded'
    }).on('error', sass.logError))
    .pipe(cleanCSS())
    .pipe(rename({
      suffix: '.min'
    }))
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest('./src/Project/Static/code/css'))
    .pipe(browserSync.stream());
});

// Watch SCSS
gulp.task("scss:watch", () => watchSass([
    './src/Project/Static/code/scss/**/*.scss'    
])
    .pipe(sass())
    .pipe(gulp.dest('./src/Project/Static/code/css')));


// Minify JavaScript
gulp.task('js:minify', function() {
  return gulp.src([
      './src/Project/Static/code/js/*.js',
      '!./src/Project/Static/code/js/*.min.js'
    ])
    .pipe(uglify())
    .pipe(rename({
      suffix: '.min'
    }))
    .pipe(gulp.dest('./src/Project/Static/code/js'))
    .pipe(browserSync.stream());
});

// JS
gulp.task('js', ['js:minify']);

// HTML
// replace : https://github.com/coderhaoxin/gulp-file-include/issues/128
gulp.task('html', function () {
  gulp.src('./src/Project/Static/code/html/fr/*.html')
  .pipe(fileinclude())
  .pipe(replace(/[\u200B-\u200D\uFEFF]/g, ""))
  .pipe(gulp.dest('./src/Project/Static/code/'))
  
  gulp.src('./src/Project/Static/code/html/en/*.html')
  .pipe(fileinclude())
  .pipe(replace(/[\u200B-\u200D\uFEFF]/g, ""))
  .pipe(gulp.dest('./src/Project/Static/code/en/'))
})

// Default task
gulp.task('default', ['scss', 'html', 'js', 'vendor']);

// Configure the browserSync task
gulp.task('browserSync', function() {
  browserSync.init({
    server: {
      baseDir: "./src/Project/Static/code/",
	  routes: {
		  '/en/universe': './src/Project/Static/code/en/universe.html',
		  '/en/services': './src/Project/Static/code/en/services.html',
		  '/en/contact': './src/Project/Static/code/en/contact.html',
		  '/en/legal': './src/Project/Static/code/en/legal.html',
		  '/en/404': './src/Project/Static/code/en/404.html',
		  '/en/index': './src/Project/Static/code/en/index.html',
		  '/en/': './src/Project/Static/code/en/index.html',
		  '/en': './src/Project/Static/code/en/index.html',
		  '/fr/universe': './src/Project/Static/code/universe.html',
		  '/fr/services': './src/Project/Static/code/services.html',
		  '/fr/contact': './src/Project/Static/code/contact.html',
		  '/fr/legal': './src/Project/Static/code/legal.html',
		  '/fr/404': './src/Project/Static/code/404.html',
		  '/fr/index': './src/Project/Static/code/index.html',
		  '/fr/': './src/Project/Static/code/index.html',
		  '/fr': './src/Project/Static/code/index.html',
		  '/universe': './src/Project/Static/code/universe.html',
		  '/services': './src/Project/Static/code/services.html',
		  '/contact': './src/Project/Static/code/contact.html',
		  '/legal': './src/Project/Static/code/legal.html',
		  '/404': './src/Project/Static/code/404.html',
		  '/index': './src/Project/Static/code/index.html',
		  '/': './src/Project/Static/code/index.html'
	  }
    }
  });
});

// Dev task
gulp.task('dev', ['scss', 'js', 'html', 'browserSync'], function() {
  gulp.watch('./src/Project/Static/code/scss/*.scss', ['scss']);
  gulp.watch('./src/Project/Static/code/js/*.js', ['js']);
  gulp.watch(['./src/Project/Static/code/html/fr/*.html', './src/Project/Static/code/html/en/*.html', './src/Project/Static/code/include/fr/*.html', './src/Project/Static/code/include/en/*.html'], ['html', browserSync.reload]);
});
