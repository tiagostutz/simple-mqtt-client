var gulp = require('gulp');
var uglify = require('gulp-uglify');
var babel = require('gulp-babel');

gulp.task('dist', function() {
    return gulp.src(['src/**/*.js'])
        .pipe(babel({
            presets: ['@babel/env']
        }))
        .pipe(uglify().on('error', function(e){
            console.log(e);
         }))
        .pipe(gulp.dest('dist'));
});