const gulp = require('gulp');
// const jade = require('gulp-jade');
const sass = require('gulp-sass');
//瀏覽器同步
const browserSync = require('browser-sync').create();

// const sourcemaps = require('gulp-sourcemaps');
// sass.compiler = require('node-sass');
/*
  3.9版的寫法
**/
// gulp.task('jade', function () {
//   // var YOUR_LOCALS = {};

//   gulp.src('./source/**/*.jade')
//     .pipe(jade({
//       // locals: YOUR_LOCALS
//       pretty: true //參數 true 會將編譯後的檔案展開，增加可讀性
//     }))
//     .pipe(gulp.dest('./public/'))
// });

// gulp.task('sass', function () {
//   return gulp.src('./source/scss/**/*.scss')
//     .pipe(sass().on('error', sass.logError))
//     .pipe(gulp.dest('./public/css'));
// });

// //監控sass資料夾內的變更，自動更新到all.css內
// gulp.task('watch', function () {
//   gulp.watch('./source/scss/**/*.scss', gulp.series('sass'));
// });

// //合併任務
// gulp.task('default',['jade', 'sass', 'watch']);

/*** 
 * 
 * 4.0版寫法
 * 使用 function 
 */

function copyHTML() {
  return gulp.src('./source/**/*.html')
    .pipe(gulp.dest('./dist/'))
    .pipe(
      browserSync.reload({
        stream: true,
      })
    );
}

function scss() {
  return gulp.src('./source/scss/**/*.scss')
    // .pipe(sourcemaps.init())
    .pipe(sass().on('error', sass.logError))
    // .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('./dist/css/'))
    .pipe(
      browserSync.reload({
        stream: true,
      })
    );
  // cb();
}

function browser() {
  browserSync.init({
    server: {
      baseDir: "./dist" //指向要模擬的路徑
    },
    port: 8080,
  });
};

//監聽上面的更動
function watch() {
  gulp.watch('./source/**/*.html', gulp.series(copyHTML))
  gulp.watch('./source/scss/**/*.scss', gulp.series(scss))
}

//合併任務  gulp.parallel 意指兩個任務同時執行
//browser, watch 一定要一起執行才不會斷掉
exports.default = gulp.series(copyHTML, scss, gulp.parallel(browser, watch));

// exports.copy = copyHTML;
// exports.scss = scss;