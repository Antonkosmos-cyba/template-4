const { src, dest, series, watch } = require("gulp");
// const sass = require('gulp-sass')(require('sass'))
const csso = require("gulp-csso");
// const concat = require('gulp-concat')
const autoprefixer = require("gulp-autoprefixer");
// const include = require('gulp-file-include')
const htmlmin = require("gulp-htmlmin");
const imagemin = require("gulp-imagemin");
const webp = require("gulp-webp");
const webphtml = require("gulp-webp-html");
// const svgsprite = require('gulp-svg-sprite')
const svgmin = require("gulp-svgmin");
const cheerio = require("gulp-cheerio");
const replace = require("gulp-replace");
const gulpBabel = require("gulp-babel");
const gulpUglify = require("gulp-uglify");
const clean = require("gulp-clean");
const sync = require("browser-sync").create();
// import imagemin from 'gulp-imagemin';
const removeComments = require("gulp-strip-css-comments");

function html() {
  return (
    src("./*.html")
      // .pipe(include({
      //     prefix: '@@'
      // }))

      // .pipe(webphtml())
      .pipe(
        htmlmin({
          collapseWhitespace: true,
          removeComments: true,
        })
      )
      .pipe(dest("dist"))
      .pipe(sync.reload({ stream: true }))
  );
}

function css() {
  return (
    src("./**.css")
      // .pipe(sass())
      .pipe(
        autoprefixer({
          overrideBrowserslist: ["last 2 versions"],
        })
      )
      .pipe(csso())
      // .pipe(concat('index.css'))
      .pipe(removeComments())
      .pipe(dest("dist/"))
      .pipe(sync.reload({ stream: true }))
  );
}

function cssbs() {
  return src("./css/**.css").pipe(dest("dist/css"));
}

function js() {
  return src("./bootstrap.bundle.min.js").pipe(dest("dist"));
}

function jsmuz() {
  return src("./js/**.js").pipe(dest("dist/js"));
}

function del() {
  return src("dist").pipe(clean());
}

function images() {
  return (
    src(
      "./images/**/*.{jpg,png,jpeg,webp,gif,svg}"
      // '!src/images/icon/*'
    )
      // .pipe(
      //     webp ({
      //         quality: 70
      //     })
      // )
      // .pipe(dest('dist/images'))

      // .pipe(src('src/images/**/*.{jpg,png,jpeg,svg,gif}'
      // ))

      // .pipe(imagemin(
      // {
      //     progressive: true,
      //     svgoPlugins: [{removeViewBox: false}],
      //     interlaced: true,
      //     optimizationLevel: 3 //0 to7
      // }
      // ))
      .pipe(dest("dist/images"))
  );
}
function images_muz() {
  return (
    src(
      "./images/foto muz/*.{jpg,png,jpeg,webp,gif,svg}"
      // '!src/images/icon/*'
    )
      // .pipe(
      //     webp ({
      //         quality: 70
      //     })
      // )
      // .pipe(dest('dist/images'))

      // .pipe(src('src/images/**/*.{jpg,png,jpeg,svg,gif}'
      // ))

      .pipe(
        imagemin({
          progressive: true,
          svgoPlugins: [{ removeViewBox: false }],
          interlaced: true,
          optimizationLevel: 3, //0 to7
        })
      )
      .pipe(dest("dist/images/foto muz"))
  );
}

// function svgSprite(){
//     return src('dist/images/*.svg')
//     .pipe(svgsprite({
//         mode:{
//             stack:{
//                 sprite: "./sprite.svg",
//                 example: false
//             }
//         }
//     }))
//     .pipe(dest("dist/images"))
// }

function muzik() {
  return src("./media/muz/*.mp3").pipe(dest("dist/media/muz/"));
}

function video() {
  return src("./media/video/*.{mp4,webm}").pipe(dest("dist/media/video/"));
}

function font() {
  return src("./font/**").pipe(dest("dist/font"));
}

function serve() {
  sync.init({
    server: "./dist",
  });
  watch("./**.html", series(html)).on("change", sync.reload);
  watch("./**.css", series(css)).on("change", sync.reload);
  // watch('src/js/**.js', series(js)).on('change', sync.reload)
}

exports.build = series(
  del,
  images,
  images_muz,
  muzik,
  video,
  font,
  js,
  jsmuz,
  css,
  cssbs,
  html
);
exports.serve = series(
  del,
  images,
  images_muz,
  muzik,
  video,
  font,
  js,
  css,
  cssbs,
  html,
  serve
);
// exports.clear = del
