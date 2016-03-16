var gulp = require('gulp');
var browserify = require('browserify');
var source = require('vinyl-source-stream');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var utilities = require('gulp-util');
var del = require('del');
var jshint = require('gulp-jshint');
var browserSync = require('browser-sync').create();

//Here is the bit of code we will use to tell which kind of environment we are using
var buildProduction = utilities.env.production;

//Concatenates all files with the "-interface.js" ending to a filename and puts it into the tmp file
gulp.task('concatInterface', function() {
  return gulp.src(['./js/*-interface.js'])
    .pipe(concat('allConcat.js'))
    .pipe(gulp.dest('./tmp'));
});

//Running concatInterface first, as a dependency, then browserifying.
//concatInterface is needed as a dependency of this task because it is always necessary.
gulp.task('jsBrowserify', ['concatInterface'] , function() {
  return browserify({ entries: ['./tmp/allConcat.js'] })
    .bundle()
    .pipe(source('app.js'))
    .pipe(gulp.dest('./build/js'));
});

//Minifies, or uglifies, the scripts in app.js for faster browser performance.  jsBrowserify is a dependency, therefore concatInterface
// will also be run.
gulp.task("minifyScripts", ["jsBrowserify"], function(){
  return gulp.src("./build/js/app.js")
    .pipe(uglify())
    .pipe(gulp.dest("./build/js"));
});

//Deletes existing build and tmp files. This is a dependency of the build task that is below.
gulp.task("clean", function(){
  return del(['build', 'tmp']);
});

//Creates either a dev or production build.  This is determined by the absence or presence of the --production flag. If it is a production build, it starts uglify, else is starts browserify.
gulp.task("build", ['clean'], function(){
  if (buildProduction) {
    gulp.start('minifyScripts');
  } else {
    gulp.start('jsBrowserify');
  }
});

//Allows you to debug your JS code by running "gulp jshint" in the terminal
gulp.task('jshint', function(){
  return gulp.src(['js/*.js'])
    .pipe(jshint())
    .pipe(jshint.reporter('default'));
});

//Browsersync task, with the list of files we are watching and their corresponding build tasks listed below
gulp.task('serve', function() {
  browserSync.init({
    server: {
      baseDir: "./",
      index: "index.html"
    }
  });

  gulp.watch(['js/*.js'], ['jsBuild']);
  gulp.watch(['bower.json'], ['bowerBuild']);
  gulp.watch(['*.html'], ['htmlBuild']);
});

//the jsBuild task
gulp.task('jsBuild', ['jsBrowserify', 'jshint'], function(){
  browserSync.reload();
});

//the bowerBuild task
gulp.task('bowerBuild', ['bower'], function(){
  browserSync.reload();
});

//the html build task
gulp.task('htmlBuild', function() {
  browserSync.reload();
});
