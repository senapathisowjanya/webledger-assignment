(function() {

    var gulp   = require('gulp'),
        karma  = require('gulp-karma'),
        jshint = require('gulp-jshint'),
        jsdoc  = require('gulp-jsdoc');
    
    gulp.task('jsdoc', function gulpJSDoc() {

        gulp.src('common/Recipes.js')
            .pipe(jsdoc('docs'))
        
    });

    gulp.task('karma', function gulpKarma() {

        var testFiles = [
            'example/vendor/jquery/dist/jquery.js',
            'example/vendor/sinonjs/sinon.js',
            'example/vendor/q/q.js',
            'common/Recipes.js',
            'tests/spec.js'
        ];

        return gulp.src(testFiles).pipe(karma({
            configFile: 'karma.conf.js',
            action: 'run'
        })).on('error', function onError(error) {
            throw error;
        });
        
    });


    gulp.task('build', function gulpBuild(){
        
        gulp.src(['common/Recipes.css', 'common/Recipes.js'])
            .pipe(gulp.dest('example/vendor/recipes'))
        
    });

    gulp.task('hint', function gulpHint() {
        
        return gulp.src(['common/Recipes.js'])
            .pipe(jshint('.jshintrc'))
            .pipe(jshint.reporter('default'));
        
    });

    gulp.task('test', ['karma', 'hint']);
    gulp.task('default', ['test', 'build', 'jsdoc']);

})();