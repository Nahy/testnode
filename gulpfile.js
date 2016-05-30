var gulp = require('gulp'),
    gutil = require('gulp-util'),
    gulpif = require('gulp-if'),
    uglify = require('gulp-uglify'),
    browserify = require('gulp-browserify'),
    minifyHTML = require('gulp-minify-html'),
    concat = require('gulp-concat'),
    compass = require('gulp-compass'),
    connect = require('gulp-connect');


var env,
  jsSources,
  jsSources,
  sassSources,
  htmlSources,
  outputDir,
  sassStyle,
  outputDir;

/*
 env = process.env.NODE_ENV || 'development';*/
 process.env.NODE_ENV = 'production';
 console.log(process.env.NODE_ENV);
 
 if(env === 'development'){
  outputDir = 'builds/development/';
  sassStyle = 'expanded';
 } else{
  outputDir = 'builds/production/';
  sassStyle = 'compressed';
 }

jsSources = [
  'components/scripts/jquery-1.7.1.min.js',
  'components/scripts/jquery.jscrollpane.min.js',
  'components/scripts/jquery.mousewheel.js',
  'components/scripts/masonry.min.js',
  'components/scripts/slick.min.js',
  'components/scripts/main.js'
];
sassSources = ['components/sass/screen.sass'];
htmlSources = [outputDir + '*html'];
jsonSources = [outputDir + '*json'];

var $ = require("jquery");

gulp.task('watch',function(){
  gulp.watch(jsSources,['js']);
  gulp.watch('components/sass',['compass']);
  gulp.watch(htmlSources, ['html']);
   gulp.watch(jsonSources, ['json']);
});
/*
gulp.task('log', function(){
   gutil.log('testing log');
});

gulp.task('json', function(){
   gulp.src('jsonSources')
      .pipe(connect.reload())
});
*/

gulp.task('connect', function(){
   connect.server({
      root: 'builds/development/',
      livereload : true

   });
});

gulp.task('html', function(){
   gulp.src(htmlSources)
   .pipe(gulpif(env === 'production', minifyHTML()))
   .pipe(gulpif(env === 'production', gulp.dest(outputDir)))
   .pipe(connect.reload())
});


gulp.task('js', function(){
   gulp.src(jsSources)
       .pipe(concat('script.js'))
       .pipe(browserify())
       .pipe(gulpif(env ==='production', uglify()))
       .pipe(gulp.dest(outputDir + 'js'))
       .pipe(connect.reload())
});

gulp.task('compass', function(){
    gulp.src(sassSources)
        .pipe(compass({
            sass: 'components/sass',
            image: outputDir + 'images',
            style: sassStyle
        }))
        .on('error', gutil.log)
        .pipe(gulp.dest(outputDir + 'css'))
        .pipe(connect.reload())
});

gulp.task('default',['html','js','compass', 'connect', 'watch']); /*'json' */