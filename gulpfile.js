const gulp = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const rename = require('gulp-rename');

const browserSync = require('browser-sync');
const uglify = require('gulp-uglify');
const cleanCSS = require('gulp-clean-css');
const autoprefixer = require('gulp-autoprefixer');



gulp.task('copyJS', function () {
    return gulp.src('app/js/*.js')
        .pipe(uglify())
        .pipe(gulp.dest('public/js/'));
});

gulp.task('sassToCSS', function () {
    return gulp.src('app/scss/*.scss')
        .pipe(sass({
            errorLogToConsole: true
        }))
        .on('error', console.error.bind(console))
        .pipe(autoprefixer({
            overrideBrowserslist: ['last 15 versions'],
            cascade: false
        }))
        .pipe(cleanCSS())
        .pipe(gulp.dest('public/css/'));
});

gulp.task('serve', function () {
    browserSync.init({
        server: 'public'
    });
    browserSync.watch('public/**/*.*').on('change', browserSync.reload);
});

gulp.task('watchFiles', function () {
    gulp.watch('app/scss/*.scss', gulp.series('sassToCSS'));
    gulp.watch('app/js/*.js', gulp.series('copyJS'));
});

gulp.task('default', gulp.parallel('watchFiles', 'serve'));