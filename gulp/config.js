var src         = 'src';
var dist        = 'dist'; 

module.exports = {
  overlord: dist + '/**/*.{js,html}',
  browsersync: {
    server: {
      baseDir: [dist]
    },
    port: 8888
  },
  delete: {
    src: [dist]
  },
  sass: {
    src:  src + '/scss/main.scss',
    dest: dist + '/css',
    options: {
      noCache: true,
      bundleExec: true,
      sourcemaps: false
    }
  },
  autoprefixer: {
    browsers: [
      'last 2 versions',
      'safari 5',
      'ie 8',
      'ie 9',
      'opera 12.1',
      'ios 6',
      'android 4'
    ],
    cascade: true
  },
  scripts: {
    src: [
      src + '/js/app.js'
    ],
    dest: dist + '/js',
    name: 'app.js'
  },
  images: {
    src:  src + '/img/**/*',
    dest: dist + '/img'
  },
  copyfiles: {
    fonts: {
      src:  src + '/fonts/*',
      dest: dist + '/fonts'
    },
    videos: {
      src:  src + '/videos/*',
      dest: dist + '/videos'
    },
    html: {
      src: src + '/**/*.html',
      dest: dist
    }
  },
  watch: {
    sass:    src + '/scss/**/*.{sass,scss}',
    scripts: src + '/js/**/*.js',
    images:  src + '/img/**/*.{svg,jpg,jpeg,png,gif}',
    html:    src + '/**/*.html'
  },
  scsslint: {
    src: [
      src + '/scss/**/*.{sass,scss}',
      '!' + src + '/scss/helpers/*.scss'
      ],
    options: {
      bundleExec: true
    }
  },
  jshint: {
    src: src + '/js/*.js'
  }
};