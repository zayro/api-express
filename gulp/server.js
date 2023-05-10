const gulp = require('gulp')
const serve = require('gulp-serve')

gulp.task('serve', serve('public'))
gulp.task('serve-build', serve(['public', 'build']))
gulp.task('serve-prod', serve({
  root: ['public', 'build'],
  port: 80
}))
gulp.task('serve-prod-secure', serve({
  root: ['public', 'build'],
  port: 443,
  https: true,
  middleware: function (req, res) {
    // custom optional middleware
  }
}))
