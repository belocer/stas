let preprocessor = 'less';

const {src, dest, parallel, series, watch} = require('gulp');
const browserSync = require('browser-sync').create();
const concat = require('gulp-concat');
const uglify = require('gulp-uglify-es').default;
const sass = require('gulp-sass');
const less = require('gulp-less');
const autoprefixer = require('gulp-autoprefixer');
const gcmq = require('gulp-group-css-media-queries');
const smartGrid = require('smart-grid');
const sourcemaps = require('gulp-sourcemaps');
const cleancss = require('gulp-clean-css');
const imagemin = require('gulp-imagemin');
const newer = require('gulp-newer');
const del = require('del');
const webp = require('gulp-webp');
const babel = require('gulp-babel');
const critical = require('critical');

function browsersync() {
    browserSync.init({
        server: {
            baseDir: 'app/',
            notify: false,
            online: true
        }
    });
}

function scripts() {
    return src([
        'app/js/lib/tiny-slider.js',
        'app/js/Menu.js',
        'app/js/ValidationForm.js',
        'app/js/Tabs.js',
        'app/js/app.js',
        'app/js/anim.js',
        'app/js/SendByEmail.js',
    ])
        .pipe(sourcemaps.init())
        .pipe(babel({
            presets: ["@babel/preset-env"]
        }))
        .pipe(uglify())
        .pipe(concat('app.min.js'))
        .pipe(sourcemaps.write("."))
        .pipe(dest('app/js/'))
        .pipe(browserSync.stream());
}

function styles() {
    return src([
        'app/' + preprocessor + '/main.' + preprocessor,
    ])
        .pipe(sourcemaps.init())
        .pipe(eval(preprocessor)())
        .pipe(concat('app.min.css'))
        .pipe(autoprefixer({overrideBrowserslist: ['last 10 versions'], grid: true}))
        .pipe(gcmq())
        .pipe(cleancss(({level: {1: {specialComments: 0}}/*, format: 'beautify'*/})))
        .pipe(dest('app/css/'))
        .pipe(browserSync.stream());
}

function images() {
    img_old()
    return src('app/img/src/**/*')
        .pipe(newer('app/img/dest/'))
        .pipe(webp())
        .pipe(imagemin())
        .pipe(dest('app/img/dest/'));
}

function img_old() {
    return src('app/img/src/**/*')
        .pipe(newer('app/img/dest/'))
        .pipe(imagemin())
        .pipe(dest('app/img/dest/'));
}

function startwatch() {
    watch('app/**/' + preprocessor + '/**/*', styles);
    watch(['app/**/*.js', '!app/**/*.min.js'], scripts);
    watch('app/**/*.html').on('change', browserSync.reload);
    watch('app/img/src/**/*', images);
}

function cleanimg() {
    return del('app/img/dest/**/*', {force: true});
}

function cleandist() {
    return del('app/dist/**/*', {force: true});
}

function buildcopy() {
    return src([
        'app/css/**/*.min.css',
        'app/js/**/*.min.js',
        'app/js/**/*.min.js.map',
        'app/img/dest/**/*',
        'app/**/*.html',
    ], {base: 'app'})
        .pipe(dest('dist'));
}

const smartGridConf = {
    outputStyle: preprocessor,
    columns: 12,
    offset: '30px',
    mobileFirst: false,
    container: {
        maxWidth: '1100px',
        fields: '30px'
    },
    breakPoints: {
        lg: {
            width: '1100px',
            fields: '30px'
        },
        md: {
            width: '960px',
            fields: '15px'
        },
        lmd: {
            width: '895px',
            fields: '15px'
        },
        sm: {
            width: '720px',
            fields: '10px'
        },
        lxs: {
            width: '500px',
            fields: '10px'
        },
        xs: {
            width: '380px',
            fields: '10px'
        },
        xxs: {
            width: '321px',
            fields: '5px'
        }
    }
}

function grid() {
    smartGrid('app/' + preprocessor, smartGridConf)
}

const paramsCritical = {
    inline: false,

    // Your base directory
    base: './',

    // HTML source file
    src: 'dist/index.html',

    // Your CSS Files (optional)
    css: ['dist/css/app.min.css'],

    // Viewport width
    width: 1920,

    // Viewport height
    height: 720,

    // Исключения
    /*include: [
        'footer'
    ],*/

    // Output results to file
    target: {
        css: 'dist/css/critical.css',
        uncritical: 'dist/css/async.css',
    },

    // Extract inlined styles from referenced stylesheets


    // Игнорирование CSS правил
    ignore: {
        atrule: ['@font-face'],
        //rule: [/some-regexp/],
        //decl: (node, value) => /big-image\.png/.test(value),
    },
};

function criticalStart() {
    return critical.generate(paramsCritical);
}

exports.browsersync = browsersync;
exports.scripts = scripts;
exports.styles = styles;
exports.images = images;
exports.cleanimg = cleanimg;
exports.criticalStart = criticalStart;
exports.grid = grid;
exports.build = series(cleandist, styles, scripts, images, buildcopy, /*criticalStart*/);

exports.default = parallel(styles, scripts, browsersync, startwatch);