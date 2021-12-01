var gulp = require("gulp");
// sass
var sass = require('gulp-sass')(require('sass'));
// browserSync
var browserSync = require('browser-sync').create();
// pug
var pug = require("gulp-pug");
// js
var uglify = require('gulp-uglify');
// browserify
var browserify = require("browserify");
var concat = require('gulp-concat');

// Compile sass into CSS & auto-inject into browsers
gulp.task('sass', function() {
    return gulp.src("src/sass/**/*.scss")
        .pipe(sass({ outputStyle: 'expanded' }))
        .pipe(concat('style.css'))
        .pipe(gulp.dest("dist/css/"))
        .pipe(browserSync.stream());
});
// compile pug into html
gulp.task('pug', function() {
    return gulp.src("src/pug/**/*.pug")
        .pipe(pug({
            pretty: true
        }))
        .pipe(gulp.dest("dist/"));
});

// process JS files and return the stream.
gulp.task('js', function() {
    return gulp.src('src/js/**/*.js')
        .pipe(gulp.dest('dist/js/'))
        .pipe(browserSync.stream());
});

function watch() {
    browserSync.init({
        server: {
            baseDir: './dist',
            port: 3005,
        }
    });
    gulp.watch("src/sass/**/*.scss", gulp.series('sass'));
    gulp.watch("src/pug/**/*.pug", gulp.series('pug'));
    gulp.watch("src/js/**/*.js", gulp.series('js'));
    gulp.watch("dist/**/*.html").on('change', function() {
        browserSync.reload();
    });
}


exports.watch = watch;