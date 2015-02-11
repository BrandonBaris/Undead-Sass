var gulp = require('gulp');
var sass = require('gulp-sass');
var tinylr;

gulp.task('sass',function(){
  return gulp.src('./sass/*.scss')
      .pipe(sass( { errLogToConsole: true } ))
      .pipe(gulp.dest('./public/css'));
});

gulp.task('livereload', function() {
  tinylr = require('tiny-lr')();
  tinylr.listen(8000);
});

function notifyLiveReload(event) {
  var fileName = require('path').relative(__dirname, event.path);

  tinylr.changed({
    body: {
      files: [fileName]
    }
  });
}

gulp.task('watch', function(){
  gulp.watch('./sass/**/*.scss', ['sass']);
  gulp.watch('public/index.html', notifyLiveReload);
  gulp.watch('public/css/*.css', notifyLiveReload);
});

gulp.task('default', ['watch','sass','livereload'],function(){});
