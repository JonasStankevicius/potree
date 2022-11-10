var gulp = require('gulp'),
	connect = require('gulp-connect-php'),
	browserSync = require('browser-sync');

gulp.task('default', function () {
	connect.server({}, function () {
		browserSync({
			// server: {
			// 	baseDir: "app",
			// 	// index: "/index.php"
			// },
			proxy: '127.0.0.1:8000'
		});
	});

	gulp.watch(['**/*.php', '**/*.html', '**/*.js']).on('change', function () {
		browserSync.reload();
	});
});