const { src, dest, task, series, watch } = require("gulp");
const rm = require('gulp-rm');
const sass = require('gulp-sass');
const concat = require('gulp-concat');
const browserSync = require('browser-sync').create();
const reload = browserSync.reload;
const sassGlob = require('gulp-sass-glob');
const autoprefixer = require('gulp-autoprefixer');
// const px2rem = require('gulp-smile-px2rem');
const gcmq = require('gulp-group-css-media-queries');
const cleanCSS = require('gulp-clean-css');
const sourcemaps = require('gulp-sourcemaps');
const babel = require('gulp-babel');
const uglify = require('gulp-uglify');


sass.compiler = require('node-sass');

task('clean', () => {
    return src('prod/**/*', { read: false })
        .pipe(rm())
});

task('copy:html', () => {
    return src('./dev/*.html')
        .pipe(dest('prod'))
        .pipe(reload({ stream: true }))
});

task('copy:img', () => {
    return src('./dev/img/**/*')
        .pipe(dest('prod/img/'))
        .pipe(reload({ stream: true }))
});

task('copy:fonts', () => {
    return src('./dev/fonts/*')
        .pipe(dest('prod/fonts/'))
        .pipe(reload({ stream: true }))
});

const styles = [
    './node_modules/normalize.css/normalize.css',
    './dev/styles/main.scss'
]

task('styles', () => {
    return src(styles)
        .pipe(sourcemaps.init())
        .pipe(concat('main.min.scss'))
        .pipe(sassGlob())
        .pipe(sass().on('error', sass.logError))
        // .pipe(px2rem())
        .pipe(autoprefixer({
            overrideBrowserslist: ['last 2 versions'],
            cascade: false
        }))
        .pipe(gcmq())
        .pipe(cleanCSS())
        .pipe(sourcemaps.write())
        .pipe(dest('prod'));
});

const libs = [
    'node_modules/jquery/dist/jquery.js',
    'node_modules/mobile-detect/mobile-detect.js',
    'node_modules/jquery-touchswipe/jquery.touchSwipe.js',
    'node_modules/bxslider/dist/jquery.bxslider.js',
    'dev/scripts/*.js'
];

task('scripts', () => {
    return src(libs)
        .pipe(sourcemaps.init())
        .pipe(concat('main.min.js', { newLine: ';' }))
        .pipe(babel({
            presets: ['@babel/env']
        }))
        .pipe(uglify())
        .pipe(sourcemaps.write())
        .pipe(dest('prod'));
});

task('server', () => {
    browserSync.init({
        server: {
            baseDir: "./prod",
        },
        // open: false
    });
});

watch("./dev/styles/**/*.scss", series("styles"));
watch('./dev/*.html', series('copy:html'));
watch('./dev/img/**/*', series('copy:img'));
watch('./dev/fonts/*', series('copy:fonts'));
watch('./dev/scripts/*.js', series('scripts'));

task("default", series("clean", "copy:html", "copy:img", "copy:fonts", "styles", "scripts", "server"));