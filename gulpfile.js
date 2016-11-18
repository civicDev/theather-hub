var gulp = require('gulp');
var gulpWatch = require('gulp-watch');
var sourcemaps = require('gulp-sourcemaps');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');
var browserify = require('browserify');
var watchify = require('watchify');
var babelConfig = require("./babel-config");

function compile(watch) {
  var bundler = browserify('./src/client/index.js', {
      debug: true
  }).transform("babelify", babelConfig);

  if(watch){
    bundler = watchify(bundler);
  }

  function rebundle() {
    bundler.bundle()
      .on('error', function(err) { console.error(err); this.emit('end'); })
      .pipe(source('build.js'))
      .pipe(buffer())
      .pipe(sourcemaps.init({ loadMaps: true }))
      .pipe(sourcemaps.write('./'))
      .pipe(gulp.dest('./public/js'));
  }

  if (watch) {
    bundler.on('update', function() {
      console.log('-> bundling...');
      rebundle();
      console.log('-> done bundling...');
    });
  }

  rebundle();
}

function watch() {
  return compile(true);
};

gulp.task('build', function() { return compile(); });
gulp.task('watch', function() { return watch(); });

function cleanRequireCache(){
  for(var i in require.cache){
    if(i.indexOf("node_modules") === -1){
      delete require.cache[i];
    }
  }
}

var server = null;
function restartServer(){
  if(server){
    console.log("stopping server");
    server.close();
  }
  cleanRequireCache();
  server = require("./src/server/index.js").listen(8080, ()=>{
    console.log("Started on 8080");
  });
}

gulp.task("dev-server", function(){
  watch();
  restartServer();
  gulpWatch("./src/server/**/*.js",()=>{
    restartServer();
  });
});

gulp.task('default', ['watch']);
