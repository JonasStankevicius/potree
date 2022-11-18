var gulp = require('gulp');
var concat = require('gulp-concat');
var changed = require('gulp-changed');
var phpConect = require('gulp-connect-php');
var nano = require('gulp-cssnano');
var sass = require('gulp-sass');
var bs = require('browser-sync');

gulp.task('default', ['browser-sync']);

gulp.task('php', function () {
	phpConect.server({ base: 'build/', port: 8010, keepalive: true });
});

gulp.task('browser-sync', ['php', 'watch'], function () {
	bs({
		proxy: '127.0.0.1:8010',
		port: 8080,
		open: true,
		notify: false
	});
	gulp.watch(["./build/**/*.html", "./build/**/*.php", "./build/**/*.js", "./build/img/**/*"]).on('change', bs.reload);
});

gulp.task('watch', ['html-include', 'php-files', 'sass', 'scripts', 'assets', 'fonts'], function () {
	gulp.watch('./source/**/*.html', ['html-include']);
	gulp.watch('./source/**/*.php', ['php-files']);
	gulp.watch('./source/**/*.js', ['scripts']);
	gulp.watch('./source/**/*.scss', ['sass']);
	gulp.watch('./source/img/**/*', ['assets']);
	gulp.watch('./source/fonts/**/*', ['fonts']);
});

gulp.task('html-include', function () {
	return gulp.src('./source/**/*.html') // Ignores template files  
		.pipe(changed('./build/**/*'))
		.pipe(gulp.dest('./build/'));
});

gulp.task('php-files', function () {
	return gulp.src('./source/**/*.php') // Ignores template files
		.pipe(changed('./build/**/*'))
		.pipe(gulp.dest('./build/'));
});

gulp.task('scripts', function () {
	return gulp.src('./source/js/*.js')
		.pipe(changed('./build/js/**/*')) // Ignore unchanged files
		.pipe(gulp.dest('./build/js/'));
});

gulp.task('assets', function () {
	return gulp.src('./source/img/**/*')
		.pipe(changed('./build/img/**/*')) // Ignore unchanged files
		.pipe(gulp.dest('./build/img'));
});

gulp.task('fonts', function () {
	return gulp.src('./source/fonts/**/*')
		.pipe(changed('./build/fonts/**/*')) // Ignore unchanged files
		.pipe(gulp.dest('./build/fonts'));
});

gulp.task('sass', function () {
	return gulp.src('./source/sass/*.scss')
		.pipe(sass())
		.pipe(concat('style.min.css'))
		.pipe(nano()) // Only enable for deployment, too slow for development
		.pipe(gulp.dest('./build/css/'))
		.pipe(bs.stream());
});