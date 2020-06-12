const gulp = require('gulp');
const jshint = require('gulp-jshint');
const babel = require('gulp-babel');
const uglify = require('gulp-uglify');
const runSequence = require('run-sequence');
const browserSync = require('browser-sync').create();

gulp.task('processHTML', async () => {
    gulp.src('*.html')
        .pipe(gulp.dest('dist'));
});

gulp.task('processJS',async () => {
    gulp.src('scripts.js')
        .pipe(jshint({
            esversion: 6
        }))
        .pipe(jshint.reporter('default'))
        .pipe(babel({
            presets: ['env']
        }))
        .pipe(uglify())
        .pipe(gulp.dest('dist'));
});
gulp.task('babelPolyfill',async () => {
    gulp.src('node_modules/babel-polyfill/browser.js')
        .pipe(gulp.dest('dist/node_modules/babel-polyfill'));
});

gulp.task('default',  async (callback) => {
    runSequence(['processHTML', 'processJS', 'babelPolyfill'], callback);
});

gulp.task('browserSync',async () => {
    browserSync.init({
        server: './dist',
        port: 8080,
        ui: {
            port: 8081
        }
    });
});

