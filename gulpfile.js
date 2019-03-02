var gulp = require('gulp'),
	uglify = require('gulp-uglify'),
	imagemin = require('gulp-imagemin'),
	cleanCSS = require('gulp-clean-css');

// CSS task
// Compress
gulp.task('minify-css', () => {
  return gulp.src('css/*.css')
    .pipe(cleanCSS({compatibility: 'ie8'}))
    .pipe(gulp.dest('build/css'));
});

//Scripts task
//Compress
gulp.task('scripts', function() {
	return gulp.src('js/*.js')
	.pipe(uglify())
	.pipe(gulp.dest('build/js'));
});

// Image task
// Compress
gulp.task('image', function() {
	return gulp.src('img/*')
		.pipe(imagemin())
		.pipe(gulp.dest('build/img'));
});