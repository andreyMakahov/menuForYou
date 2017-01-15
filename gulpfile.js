var gulp = require('gulp');
var webpack = require('gulp-webpack');
var sass = require('gulp-sass');
var concat = require('gulp-concat');
var webpackConfig = require('./webpack.config');

gulp.task('default', ['scripts', 'styles'], function() {});

gulp.task('scripts', function() {
    return gulp.src('src/**/*.js')
        .pipe(webpack(webpackConfig()))
        .pipe(gulp.dest('build'))
});

gulp.task('styles', function() {
    return gulp.src([
        'src/**/*.scss',
        'node_modules/bootstrap/dist/css/bootstrap.css'
    ])
        .pipe(sass())
        .pipe(concat('style.css'))
        .pipe(gulp.dest('build'))
});