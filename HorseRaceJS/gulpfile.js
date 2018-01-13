/// <binding AfterBuild='default' />
/*
This file is the main entry point for defining Gulp tasks and using Gulp plugins.
Click here to learn more. https://go.microsoft.com/fwlink/?LinkId=518007
*/

var gulp = require('gulp');
var uglify = require('gulp-uglify');
var concat = require('gulp-concat');
var clean = require('gulp-clean');
var annotate = require('gulp-ng-annotate');

var scripts = {
    input: './Scripts/app/*.js',
    output: './Scripts/app/output/'
}

gulp.task('default', ['process-js-app'], function () {
    console.log('Gulp running!');
});

gulp.task('clean', function () {
    return gulp.src(scripts.output + '*', { read: false })
        .pipe(clean({ force: true }));
});

gulp.task('process-js-app', ['clean'], function () {
    return gulp.src(['./Scripts/app/HorseRaceApp.js', './Scripts/app/RandomService.js', scripts.input]) // source order is significant
        .pipe(concat('main.js'))
        .pipe(annotate())
        .pipe(uglify())
        .pipe(gulp.dest(scripts.output));
});

gulp.task('watch-default', function () {
    return gulp.watch(scripts.input, ['default']);
});