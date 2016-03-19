const gulp = require('gulp');
const babelify = require('babelify');
const sourcemaps = require('gulp-sourcemaps');
const source = require('vinyl-source-stream');
const buffer = require('vinyl-buffer');
const browserify = require('browserify');
const gls = require('gulp-live-server');
const htmlmin = require('gulp-htmlmin');
const runSequence = require('run-sequence');
const sass = require('gulp-sass');
const eslint = require('gulp-eslint');
const gutil = require('gulp-util');
const chalk = require('chalk');
const clean = require('gulp-clean');
const uglify = require('gulp-uglify');

gulp.task('default', ['lint', 'js', 'sass', 'html', 'textures']);

gulp.task('clean', () => {
    return gulp.src('./dist/**/*', { read: false })
        .pipe(clean());
});

gulp.task('js', () => {
    return browserify('src/app.js', { debug: true })
        .transform(babelify, {
            presets: ['es2015']
        })
        .bundle()
        .on('error', map_error)
        .pipe(source('app.js'))
        .pipe(buffer())
        .pipe(sourcemaps.init({ loadMaps: true }))
        .pipe(uglify())
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest('./dist/js'));
});

gulp.task('sass', () => {
    return gulp.src('src/styles/**/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('./dist/styles'));
});

gulp.task('html', () => {
    return gulp.src('src/**/*.html')
        .pipe(htmlmin({ collapseWhitespace: true })).pipe(gulp.dest('dist'));
});

gulp.task('lint', () => {
    return gulp.src(['src/**/*.js', '!node_modules/**'])
        .pipe(eslint())
        .pipe(eslint.formatEach());
});

gulp.task('textures', () => {
    return gulp.src('src/textures/**/*.*')
        .pipe(gulp.dest('./dist/textures'));
});

gulp.task('serve', ['default'], () => {
    var server = gls.static('dist', 8888);
    server.start();

    gulp.watch(['src/**/*.js'], ['js']);
    gulp.watch(['src/**/*.html'], ['html']);
    gulp.watch(['src/styles/**/*.scss'], ['sass']);
    gulp.watch(['src/textures/**/*.*'], ['sass']);

    gulp.watch(['dist/**/*'], (file) => {
        server.notify.apply(server, [file]);
    });
});

function map_error(err) {
  if (err.fileName) {
    // regular error
    gutil.log(chalk.red(err.name)
      + ': '
      + chalk.yellow(err.fileName.replace(__dirname + '/src/js/', ''))
      + ': '
      + 'Line '
      + chalk.magenta(err.lineNumber)
      + ' & '
      + 'Column '
      + chalk.magenta(err.columnNumber || err.column)
      + ': '
      + chalk.blue(err.description))
  } else {
    // browserify error..
    gutil.log(chalk.red(err.name)
      + ': '
      + chalk.yellow(err.message))
  }
}
