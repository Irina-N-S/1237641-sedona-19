"use strict";

var gulp = require("gulp");
var plumber = require("gulp-plumber");
var sourcemap = require("gulp-sourcemaps");
var less = require("gulp-less");
var postcss = require("gulp-postcss");
var autoprefixer = require("autoprefixer");
var server = require("browser-sync").create();
var csso = require("gulp-csso");
var rename = require("gulp-rename");
var imagemin = require("gulp-imagemin");
var webp = require("gulp-webp");
var svgstore = require("gulp-svgstore");
var posthtml = require("gulp-posthtml");
var include = require("posthtml-include");
var del = require("del");
var uglify = require("gulp-uglify");

gulp.task("optimize-images", function () {
  return gulp.src("source/img/**/*.{png,jpg,svg}")
    .pipe(imagemin([
      imagemin.optipng({optimizationLevel: 3}),
      imagemin.mozjpeg({progressive: true}),
      imagemin.svgo()
    ]))
    .pipe(gulp.dest("build/img"));
});

gulp.task("generate-webp", function () {
  return gulp.src("source/img/**/*.{png,jpg}")
    .pipe(webp({quality: 80}))
    .pipe(gulp.dest("build/img/webp"));
});


gulp.task("create-sprite", function () {
  return gulp.src("source/img/icon-*.svg")
    .pipe(svgstore({
      inlineSvg: true
    }))
    .pipe(rename("sprite.svg"))
    .pipe(gulp.dest("build/img"))
});

gulp.task("process-images", gulp.series("optimize-images", "generate-webp", "create-sprite"));

gulp.task("optimize-html", function () {
  return gulp.src("source/*.html")
    .pipe(posthtml([
      include()
    ]))
    .pipe(gulp.dest("build"));
});

gulp.task("process-css", function () {
  return gulp.src("source/less/style.less")
    .pipe(plumber())
    .pipe(sourcemap.init())
    .pipe(less())
    .pipe(postcss([
      autoprefixer()
    ]))
    .pipe(csso())
    .pipe(rename("style.min.css"))
    .pipe(sourcemap.write("."))
    .pipe(gulp.dest("build/css"))
    .pipe(server.stream());
});

gulp.task("optimize-js", function () {
  return gulp.src([
      "node_modules/svg4everybody/dist/svg4everybody.js",
      "source/js/**/*.js"
    ])
    .pipe(uglify())
    .pipe(gulp.dest("build/js"));
});

gulp.task("copy-static", function () {
  return gulp.src([
      "source/fonts/**/*.{woff,woff2}",
      "source/css/**",
      "source/*.ico"
    ], {
      base: "source"
    })
    .pipe(gulp.dest("build"));
});

gulp.task("clean", function () {
  return del("build");
});

gulp.task("refresh", function (done) {
  server.reload();
  done();
})

gulp.task("server", function () {
  server.init({
    server: "build/",
    notify: false,
    open: true,
    cors: true,
    ui: false
  });

  gulp.watch("source/less/**/*.less", gulp.series("process-css"));
  gulp.watch("source/js/**/*.js", gulp.series("optimize-js"));
  gulp.watch("source/img/icon-*.svg", gulp.series("create-sprite", "optimize-html", "refresh"));
  gulp.watch("source/*.html", gulp.series("optimize-html", "refresh"));
});

gulp.task("build", gulp.series("clean", "copy-static", "process-css", "process-images", "optimize-js", "optimize-html"));
gulp.task("start", gulp.series("build", "server"));
