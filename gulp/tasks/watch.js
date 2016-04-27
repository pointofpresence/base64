'use strict';

gulp.task('watch', function () {
    gulp.watch(config.less + '**/*.less', ['less']);
});