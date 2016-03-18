const gulp = require('gulp');
const sourcemaps = require('gulp-sourcemaps');
const source = require('vinyl-source-stream');
const buffer = require('vinyl-buffer');
const browserify = require('browserify');
const watchify = require('watchify');
const babel = require('babelify');
const gls = require('gulp-live-server');
const htmlmin = require('gulp-htmlmin');

gulp.task('js', () => {
    var bundler = watchify(browserify('./src/app.js', { debug: true }).transform(babel));

    bundler.bundle()
        .on('error', function(err) {
            console.error(err); this.emit('end');
        })
        .pipe(source('app.js'))
        .pipe(buffer())
        .pipe(sourcemaps.init({ loadMaps: true }))
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest('./dist'));
});

gulp.task('htmlmin', function() {
  return gulp.src('src/**/*.html')
    .pipe(htmlmin({collapseWhitespace: true}))
    .pipe(gulp.dest('dist'))
});

gulp.task('default', ['js', 'htmlmin'], function() {
    var server = gls.static('dist', 8888);
    server.start();

    //use gulp.watch to trigger server actions(notify, start or stop)
    gulp.watch(['src/**/*.*'], function(file) {
        // TODO runSequence
        gulp.start('js');
        server.notify.apply(server, [file]);
    });
});
