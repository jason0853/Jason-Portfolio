var webpack = require('webpack');
var CONFIG = require('./config');

module.exports = {
    entry: {
        test1: CONFIG.SRC.JS + '/test1.js',
        test2: CONFIG.SRC.JS + '/test2.js',
    },

    output: {
        path: CONFIG.DIST.JS,
        filename: '[name].bundle.js',
        publicPath: CONFIG.DIST.ASSETS,
    },

    module: {
        rules: [
            {
                test: /\.js$/,
                include: CONFIG.SRC.JS,
                loader: 'babel-loader',
                options: {
                    presets: ['es2015'],
                },
            },
        ],
    },

    plugins: [
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false,
                drop_console: false,
            },
        }),
    ],

    devtool: 'eval-source-map',
};
