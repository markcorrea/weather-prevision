"use strict";

var gulp = require('gulp');
var compass = require('gulp-compass');
var watch = require('gulp-watch');
var concat = require('gulp-concat');
var replace = require('gulp-replace');
var clean = require('gulp-clean');

var filesJS = [
    'src/media/js/app.js',
    'src/media/js/routes.js',
    'src/app/**/*.js',
    '!src/media/js/app.min.js',
    '!src/media/vendor/**/*.js',
    '!node_modules/**/*.js',
    '!gulpfile.js',
    '!server.js'
];

gulp.task('watch-sass', function () {
    return gulp.src('src/media/sass/**/*.scss')
        .pipe(compass({
            config_file: 'src/media/config.rb',
            css: 'src/media/css',
            sass: 'src/media/sass',
            comments: true,
            task: 'watch'
        }))
        .pipe(gulp.dest('src/media/css'))
        .on('error', function (err) {
            console.log(err.message);
        });
});

gulp.task('compile-compressed-sass', function () {
    return gulp.src('src/media/sass/**/*.scss')
        .pipe(compass({
            config_file: 'src/media/config.rb',
            css: 'src/media/css',
            sass: 'src/media/sass',
            style: 'compressed'
        }))
        .pipe(gulp.dest('src/media/css'))
        .on('error', function (err) {
            console.log(err.message);
        });
});

gulp.task('concat-js', ['delete-app-min'], function () {
    return gulp.src(filesJS)
        .pipe(concat('app.min.js'))
        .pipe(replace("'{{newModule}}'", ''))
        .pipe(gulp.dest('src/media/js/'))
        .on('error', function (error) {
            console.error(String(error));
        });
});

gulp.task('delete-app-min', function () {
   return gulp.src('src/media/js/app.min/js')
       .pipe(clean({force: true}));
});

gulp.task('watch-js', function () {
   gulp.watch(filesJS, ['delete-app-min', 'concat-js']);
});

gulp.task('watch', ['delete-app-min', 'concat-js', 'watch-js', 'watch-sass']);

gulp.task('generate', function (callback) {
    var runSequence = require('run-sequence');

    runSequence('delete-app-min', 'concat-js', 'compile-compressed-sass', callback);
});