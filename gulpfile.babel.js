import gulp from 'gulp';
import gutil from 'gulp-util';
import rename from 'gulp-rename';
import stylus from 'gulp-stylus';
import cleanCSS from 'gulp-clean-css';
import imagemin from 'gulp-imagemin';
import babel from 'gulp-babel';
import FileCache from 'gulp-file-cache';
import nodemon from 'gulp-nodemon';
import webpack2 from 'webpack';
import webpackStream from 'webpack-stream';
import del from 'del';
import browserSync from 'browser-sync';
import webpackConfig from './webpack.config.js';

import CONFIG from './config';

let fileCache = new FileCache();

// Delete dist folder
gulp.task('clean', () => {
    return del.sync([CONFIG.DIR.DIST]);
});

// Compile and minify for stylus
gulp.task('style', () => {
    return gulp.src(CONFIG.SRC.STYL + '/index.styl')
               .pipe(stylus())
               .pipe(cleanCSS())
               .pipe(rename('style.min.js'))
               .pipe(gulp.dest(CONFIG.DIST.CSS));
});

// Connect webpack to gulp
gulp.task('webpack', () => {
    return gulp.src(CONFIG.SRC.JS)
               .pipe(webpackStream(webpackConfig, webpack2))
               .pipe(gulp.dest(CONFIG.DIST.JS));
});

// Minify image files
gulp.task('image', () => {
    return gulp.src(CONFIG.SRC.IMG + '/**/*')
               .pipe(imagemin())
               .pipe(gulp.dest(CONFIG.DIST.IMG));
});

// Compile ES6 to ES5
gulp.task('babel', () => {
    return gulp.src(CONFIG.DIR.SERVER + '/**/*')
               .pipe(fileCache.filter())
               .pipe(babel({
                    presets: ['es2015'],
                }))
               .pipe(fileCache.cache())
               .pipe(gulp.dest(CONFIG.DIR.APP));
});

// Start nodemon
gulp.task('nodemon', ['babel'], () => {
    return nodemon({
        script: CONFIG.DIR.APP + '/app.js',
        watch: CONFIG.DIR.APP + '/**/*',
    });
});

// Configure browser-sync
gulp.task('browser-sync', () => {
    browserSync.init({
        proxy: 'http://localhost:3000',
        files: ['dist/**/*'],
        port: 7000,
    });
});

// Watch files
gulp.task('watch', () => {
    let watcher = {
        view: gulp.watch(CONFIG.DIR.VIEWS + '/**/*'),
        style: gulp.watch(CONFIG.SRC.STYL + '/**/*', ['style']),
        webpack: gulp.watch(CONFIG.SRC.JS + '/**/*', ['webpack']),
        image: gulp.watch(CONFIG.SRC.IMG + '/**/*', ['image']),
        babel: gulp.watch(CONFIG.DIR.SERVER + '/**/*', ['babel']),
    };

    let notify = (event) => {
        gutil.log('File', gutil.colors.yellow(event.path), 'was', gutil.colors.magenta(event.type));
    };

    for (var key in watcher) {
        watcher[key].on('change', notify);
    }
});

// Register tasks
gulp.task('default',
    ['clean', 'style', 'webpack', 'image', 'watch', 'nodemon', 'browser-sync'], () => {
    return gutil.log('Gulp is running!');
});
