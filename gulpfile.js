var gulp = require("gulp"),
  typedoc = require("gulp-typedoc");


gulp.task("doc", function() {
  return gulp
    .src(["./src/**/*.ts"])
    .pipe(typedoc({
      // TypeScript options (see typescript angular-docs)
      module: "commonjs",
      target: "es6",
      includeDeclarations: true,
      emitDecoratorMetaData: true,
      experimentalDecorators: true,

      // Output options (see typedoc angular-docs)
      out: "./angular-docs",

      // TypeDoc options (see typedoc angular-docs)
      name: "Calendar-Docs",
      ignoreCompilerErrors: false,
      excludeExternals:true,
      version: true,
    }));
});
