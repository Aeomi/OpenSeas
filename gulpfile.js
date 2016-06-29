var gulp        = require("gulp");
var inject      = require("gulp-inject-string");
// var uglify      = require("gulp-uglify");
var pump        = require('pump');
var typescript  = require("gulp-typescript");
var sourceMap   = require("gulp-sourcemaps");

var tsProj = typescript.createProject("tsconfig.json");
var nodeSourcemapLoad = "require('source-map-support').install({environment: 'node'});"

gulp.task("typescript", function(callback) {
    pump([
        gulp.src(["src/**/*.ts", "typings/tsd.d.ts"]),
        sourceMap.init(),
        typescript(tsProj),
        inject.after('"use strict";', nodeSourcemapLoad),
        sourceMap.write("../sourcemaps"),
        gulp.dest("dist")
    ],
    callback)
});

gulp.task("watch", function() {
    gulp.watch("src/**/*.ts", ["typescript"]);
});

gulp.task("default", ["watch", "typescript"]);