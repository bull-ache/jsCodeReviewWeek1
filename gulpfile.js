var gulp = require('gulp');
var browserify = require('browserify');
var source = require('vinyl-source-stream');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var utilities = require('gulp-util');
var del = require('del');
var jshint = require('gulp-jshint');
var browserSync = require('browser-sync').create();
var sass = require('gulp-sass');
var sourcemaps = require('gulp-sourcemaps');
var lib = require('bower-files')({
  "overrides":{
    "bootstrap" : {
      "main": [
        "less/bootstrap.less",
        "dist/css/bootstrap.css",
        "dist/js/bootstrap.js"
      ]
    }
  }
});

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

//Creates either a dev or production build.  This is determined by the absence or presence of the --production flag. If it is a production build, it starts uglify, else is starts browserify.  After that, it runs the bower task and the cssBuild task.
gulp.task('build', ['clean'], function(){
  if (buildProduction) {
    gulp.start('minifyScripts');
  } else {
    gulp.start('jsBrowserify');
  }
  gulp.start('bower');
  gulp.start('cssBuild');
});

//Allows you to debug your JS code by running "gulp jshint" in the terminal
gulp.task('jshint', function(){
  return gulp.src(['js/*.js'])
    .pipe(jshint())
    .pipe(jshint.reporter('default'));
});

//Browsersync task, with the list of files we are watching and their corresponding build tasks listed below.  Will automatically run build, as it is included as a dependency.
gulp.task('serve', ['build'], function() {
  browserSync.init({
    server: {
      baseDir: "./",
      index: "index.html"
    }
  });

  gulp.watch(['js/*.js'], ['jsBuild']);
  gulp.watch(['bower.json'], ['bowerBuild']);
  gulp.watch(['*.html'], ['htmlBuild']);
  gulp.watch(["scss/*.scss"], ['cssBuild']);
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

//bower-files task for JS frontend dependencies
gulp.task('bowerJS', function () {
  return gulp.src(lib.ext('js').files)
    .pipe(concat('vendor.min.js'))
    .pipe(uglify())
    .pipe(gulp.dest('./build/js'));
});

//bower-files task for CSS frontend dependencies
gulp.task('bowerCSS', function () {
  return gulp.src(lib.ext('css').files)
    .pipe(concat('vendor.css'))
    .pipe(gulp.dest('./build/css'));
});

//task to run bowerJS and bowerCSS at the same time with one command: gulp bower
gulp.task('bower', ['bowerJS', 'bowerCSS']);

//This task loads all source files inside of our scss folder with the extension .scss. Then it processes them by calling the sourcemaps.init method, followed by the sass method. The sass method translates our files into normal CSS, the sourcemaps package adds some code which allows us to see which SASS files are responsible for each CSS rule that we see in the browser. This makes debugging a lot easier. The last two methods save our compiled CSS with its source maps in a destination folder called css.
gulp.task('cssBuild', function() {
  return gulp.src('scss/*.scss')
    .pipe(sourcemaps.init())
    .pipe(sass())
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('./build/css'))
    .pipe(browserSync.stream());
});
