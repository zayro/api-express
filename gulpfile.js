const gulp = require('gulp')
const sourcemaps = require('gulp-sourcemaps')
const babel = require('gulp-babel')
const concat = require('gulp-concat')
const nodemon = require('gulp-nodemon')
const clean = require('gulp-clean')
const minify = require('gulp-babel-minify')

const requireDir = require('require-dir')

// Require all tasks.
requireDir('./gulp', { recurse: true })

gulp.task('production', function () {
  return gulp.src('src/**/*.js')
    .pipe(sourcemaps.init())
    .pipe(babel())
    .pipe(concat('all.js'))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('dist'))
})

gulp.task('babel', () => {
  return gulp
    .src('src/**/*.js') // Carpeta donde se encuentra tu código fuente de Express
    .pipe(babel())
    .pipe(minify({
      mangle: {
        keepClassName: true
      }
    }))
    .pipe(gulp.dest('dist')) // Carpeta donde se generará el código transpilado
})

gulp.task('start', () => {
  nodemon({
    script: 'dist/index.js -i', // Archivo de entrada de tu aplicación Express
    ext: 'js',
    env: { NODE_ENV: 'development' },
    watch: ['src'], // Carpeta a vigilar para reiniciar automáticamente el servidor
    tasks: ['babel']
  })
})

gulp.task('clean', function () {
  return gulp.src('dist', { read: false })
    .pipe(clean())
})

gulp.task('createFolders', function () {
  return gulp.src('*.*', { read: false })
    .pipe(gulp.dest('dist/public'))
    .pipe(gulp.dest('dist/public/uploads'))
})

gulp.task('folder', gulp.series('clean', 'createFolders'))

gulp.task('default', gulp.series('folder', 'babel'))

gulp.task('develop', gulp.series('folder', 'babel', 'start'))

gulp.task('production', gulp.series('clean', 'production'))
