var root   = './',
    src    = root + 'src/',
    dist   = root + 'dist/',
    jsSrc  = src + 'js/',
    jsDst  = dist + 'js/',
    node   = root + 'node_modules/',
    imgSrc = src + 'images/',
    imgDst = dist + 'images/';

module.exports = {
    "root":         root,
    "dist":         dist,
    "package":      root + 'package.json',
    "jade":         src + 'jade/',
    "less":         src + 'less/',
    "css":          dist + 'css/',
    "fonts":        dist + 'fonts/',
    "readMeSrc":    src + 'README.md',
    "readMeDst":    root + 'README.md',
    "jsSrc":        jsSrc,
    "jsDst":        jsDst,
    "imgSrc":       imgSrc,
    "imgDst":       imgDst,
    "vendor":       {
        "bootstrap":   node + 'bootstrap/'
    },
    "autoprefixer": {
        "browsers": [
            "Android 2.3",
            "Android >= 4",
            "Chrome >= 20",
            "Firefox >= 24",
            "Explorer >= 8",
            "iOS >= 6",
            "Opera >= 12",
            "Safari >= 6"
        ]
    }
};