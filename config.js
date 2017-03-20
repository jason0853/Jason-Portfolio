var path = require('path');

var DIR = {
    VIEWS: path.resolve(__dirname, 'views'),
    SRC: path.resolve(__dirname, 'src'),
    DIST: path.resolve(__dirname, 'dist'),
    SERVER: path.resolve(__dirname, 'server'),
    APP: path.resolve(__dirname, 'app'),
};

var SRC = {
    STYL: DIR.SRC + '/styl',
    JS: DIR.SRC + '/js',
    IMG: DIR.SRC + '/img',
};

var DIST = {
    ASSETS: path.resolve(DIR.DIST, 'assets'),
    CSS: path.resolve(DIR.DIST, 'assets', 'css'),
    JS: path.resolve(DIR.DIST, 'assets', 'js'),
    IMG: path.resolve(DIR.DIST, 'assets', 'img'),
};

module.exports = {
    DIR: DIR,
    SRC: SRC,
    DIST: DIST,
};
