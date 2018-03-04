const gulp = require('gulp');
const uglify = require('gulp-uglify');
const minifyCss = require('gulp-minify-css');
const imagemin = require('gulp-imagemin');
const concat = require('gulp-concat');
const webserver = require('gulp-webserver');
const babel = require('gulp-babel');


/*
   --- Top Level Functions ---

    gulp.task   -   define tasks
    gulp.src    -   Point to files to use
    gulp.dest   -   Points to folder to output
    gulp.watch  -   Watch files and folders for changes

*/

// Copy all html files
gulp.task('copyHtml', function() {
    gulp.src('src/*.html')
        .pipe(gulp.dest('dist'));
});

// Copy all php files
gulp.task('copyPhp', function() {
    gulp.src('src/*.php')
        .pipe(gulp.dest('dist'));
});


// minify and concat all custom js files
gulp.task('scripts', function() {
    gulp.src('src/js/*.js')
        .pipe(concat('main.js'))
        .pipe(babel())
        .pipe(uglify())
        .on('error', function (err) { gutil.log(gutil.colors.red('[Error]'), err.toString()); })
        .pipe(gulp.dest('dist/js'));
});


// minify and concat all custom js files
gulp.task('css', function() {
    gulp.src('src/css/*.css')
        .pipe(concat('main.css'))
        // .pipe(babel())
        .pipe(minifyCss())
        .on('error', function (err) { gutil.log(gutil.colors.red('[Error]'), err.toString()); })
        .pipe(gulp.dest('dist/css'));
});

//optimize and copy bg images to production/images
gulp.task('bgImage', () =>
	gulp.src('src/images/bg/*')
	.pipe(gulp.dest('dist/images/bg'))
);


//optimize and copy logo images to production/images
gulp.task('logo', () =>
	gulp.src('src/images/logo/*')
    .pipe(imagemin([
        imagemin.gifsicle({interlaced: true}),
        imagemin.jpegtran({progressive: true}),
        imagemin.optipng({optimizationLevel: 5}),
        imagemin.svgo({
            plugins: [
                {removeViewBox: true},
                {cleanupIDs: false}
            ]
        })
    ]))
	.pipe(gulp.dest('dist/images/logo'))
);


//copy portfolio images to production/images
gulp.task('portfolio', () =>
	gulp.src('src/images/portfolio/*')
    .pipe(imagemin([
        imagemin.gifsicle({interlaced: true}),
        imagemin.jpegtran({progressive: true}),
        imagemin.optipng({optimizationLevel: 5}),
        imagemin.svgo({
            plugins: [
                {removeViewBox: true},
                {cleanupIDs: false}
            ]
        })
    ]))
	.pipe(gulp.dest('dist/images/portfolio'))
);


//optimize and copy team images to production/images
gulp.task('team', () =>
	gulp.src('src/images/team/*')
    .pipe(imagemin([
        imagemin.gifsicle({interlaced: true}),
        imagemin.jpegtran({progressive: true}),
        imagemin.optipng({optimizationLevel: 5}),
        imagemin.svgo({
            plugins: [
                {removeViewBox: true},
                {cleanupIDs: false}
            ]
        })
    ]))
	.pipe(gulp.dest('dist/images/team'))
);

gulp.task('serve', function () {
  return gulp.src('dist')
    .pipe(webserver({
      port: 3000,
      livereload: true
    }));
});



//watch for the above functions when files are saved
gulp.task('watch', function() {
    gulp.watch('src/js/*.js', ['scripts']);
    gulp.watch('src/css/*.css', ['css']);
    gulp.watch('src/images/bg/*', ['bgImage']);
    gulp.watch('src/images/logo/*', ['logo']);
    gulp.watch('src/images/portfolio/*', ['portfolio']);
    gulp.watch('src/images/team/*', ['team']);
    gulp.watch('src/*.html', ['copyHtml']);
    gulp.watch('src/*.php', ['copyPhp']);

});


gulp.task('default', ['scripts','css','bgImage','logo','portfolio','team','copyHtml','copyPhp']);