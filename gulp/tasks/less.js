'use strict';

gulp.task('less', function () {
    var distCss = config.css,
        srcLess = config.less,
        bundle  = 'bundle.css';

    $.util.log('Creating ' + bundle + ' in ' + $.chalk.magenta(distCss) + ' ...');
    $.mkdirp(distCss);

    return gulp
        .src(srcLess + 'main.less')
        .pipe(!isProd ? $.sourcemaps.init({loadMaps: true}) : $.util.noop())
        .pipe($.less())
        .pipe($.autoprefixer(config.autoprefixer))
        .pipe(isProd ? $.replace('/*!', '/*') : $.util.noop())
        .pipe(isProd ? $.csso() : $.util.noop())
        .pipe($.header(banner, {pkg: pkg, dateFormat: $.dateFormat, now: new Date}))
        .pipe(!isProd ? $.sourcemaps.write() : $.util.noop())
        .pipe($.size({title: $.t('less')}))
        .pipe($.out(distCss + bundle));
});