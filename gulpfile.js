// Include gulp
var gulp = require('gulp');

// Include Our Plugins
var jshint = require('gulp-jshint');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var cssnano = require('gulp-cssnano');

// Lint Task
gulp.task('lint', function() {
  return gulp.src('js/*.js')
    .pipe(jshint())
    .pipe(jshint.reporter('default'));
});

// Concatenate & Minify JS
gulp.task('scripts', function() {
  return gulp.src('js/*.js')
    .pipe(concat('all.js'))
    .pipe(gulp.dest('dist'))
    .pipe(rename('all.min.js'))
    .pipe(uglify())
    .pipe(gulp.dest('dist'));
});

// Concatenate & Minify CSS
gulp.task('stylesheets', function() {
  return gulp.src('css/*.css')
    .pipe(concat('all.css'))
    .pipe(gulp.dest('dist'))
    .pipe(rename('all.min.css'))
    .pipe(cssnano())
    .pipe(gulp.dest('dist'));
});

// Watch Files For Changes
gulp.task('watch', function() {
    gulp.watch('js/*.js', ['lint', 'scripts', 'stylesheets']);
});

// Default Task
gulp.task('default', [
  'lint',
  'scripts',
  'stylesheets',
  'watch'
]);
