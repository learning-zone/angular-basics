# TsConfig files structure

The presence of a config file in a directory indicates that it is the root of a TypeScript project.
In Stark, several types of tsconfig files are placed in the packages for different purposes, described below.

## tsconfig.json

The `tsconfig.json` file can be found at the following locations:

```txt
+---starter
|	tsconfig.json
+---showcase
|	tsconfig.json
+---packages
	tsconfig.json
	+---stark-build
	|	tsconfig.json
...
```

The structure of this file is like the following:

```
{
	...
  "extends": "./node_modules/@nationalbankbelgium/stark-build/tsconfig.json",
  "compilerOptions": {
    "baseUrl": "./src",
    "outDir": "./dist",
    ...
    }
  },
  "exclude": ["node_modules", "dist"]
  ...
}
```

This file is used to build the packages where it is located.
However, we have a special case in Stark, which is the fact that a tsconfig.json file
is located in the `packages` folder.
This specific file is only used in the Stark build process.

## tsconfig.app.json

The `tsconfig.app.json` file is located in the following folders:

```txt
+---starter
|	tsconfig.app.json
+---showcase
|	tsconfig.app.json
...
```

The structure of those files is the following:

```
{
  "extends": "./tsconfig.json",
  "compilerOptions": {},
  "exclude": ["node_modules", "dist", "src/**/*.spec.ts", "src/**/*.e2e.ts"]
}
```

Those files are used for the build the application itself.

## tsconfig.spec.json

The `tsconfig.spec.json` file can be found at the following locations:

```txt
+---starter
|	tsconfig.spec.json
+---showcase
|	tsconfig.spec.json
+---packages
	+---stark-core
	|	tsconfig.spec.json
	+---stark-ui
	|	tsconfig.spec.json
...
```

The structure of this files is as the following:

```
"extends": "./tsconfig-build.json",
  "compilerOptions": {
    "module": "commonjs",
    "paths": {
      "@nationalbankbelgium/stark-core/testing": ["../../dist/packages/stark-core/testing"],
      ...
    }
  },
  "files": null,
  "include": ["**/*.ts"]
}`
```

Those files are used to build the testing bundles which contains the spec.ts files and all the files under test.
The code is compiled using CommonJs modules, as we use Karma-Typescript to create the bundles.

## tsconfig-build.json

The `tsconfig-build.json` file can be found at the following locations:

```txt
+---packages
	|
	+---stark-core
	|	tsconfig-build.json
	|	+---testing
	|	|	tsconfig-build.json
	+---stark-ui
	|	tsconfig-build.json
	|	+---testing
    |	|	tsconfig-build.json
...
```

The structure of this file is as the following:

```
//stark/packages/stark-core/tsconfig-build.json

{
  "extends": "../stark-build/tsconfig.json",
  "compilerOptions": {
    "baseUrl": ".",
    "rootDir": ".",
      ...
    },
    "outDir": "../../dist/packages/stark-ui"
  },

  "files": ["public_api.ts"],

  "angularCompilerOptions": {
    "generateCodeForLibraries": true,
    "skipMetadataEmit": false,
    ...
  }
}
```

This file is used in the build of the project. Stark uses it for packages compilation (stark-core, stark-ui,...) in
compliance with the configuration of the package.
The file will then indicate where to find the library to use to build the project, the entry point to compile, ...

## tsconfig.e2e.json

The `tsconfig.e2e.json` file is located in the `stark/starter` folder and looks like the following:

```
{
  "extends": "./tsconfig.json",
  "compilerOptions": {
    "module": "commonjs"
  }
}
```

This files are used to build the testing bundles which contains the e2e.ts files and all the application source files.
