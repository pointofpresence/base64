'use strict';

gulp.task('fonts', function () {
    $.util.log('Creating fonts in ' + $.chalk.magenta(config.fonts) + ' ...');
    $.mkdirp(config.fonts);

    return gulp
        .src(config.vendor.bootstrap + 'fonts/*.*')
        .pipe($.size({title: $.t('fonts')}))
        .pipe(gulp.dest(config.fonts));
});