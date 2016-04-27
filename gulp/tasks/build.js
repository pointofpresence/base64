'use strict';

gulp.task('build', function () {
    return $.runSequence(
        ['clean'],
        ['fonts'],
        ['less']
    );
});

gulp.task('build:prod', function () {
    global.isProd = true;
    return $.runSequence('build');
});