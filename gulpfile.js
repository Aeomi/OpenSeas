var gulp        = require("gulp");
var typescript  = require("gulp-typescript");
var sourceMap   = require("gulp-sourcemaps");

var tsProj = typescript.createProject("tsconfig.json");

gulp.task("typescript", function() {
    return gulp.src(["src/**/*.ts", "typings/tsd.d.ts"])
        .pipe(sourceMap.init())
        .pipe(typescript(tsProj))
        .pipe(sourceMap.write("../sourcemaps"))
        .pipe(gulp.dest("dist"));
});

gulp.task("watch", function() {
    gulp.watch("src/**/*.ts", ["typescript"]);
});

gulp.task("default", ["watch", "typescript"]);