# Prettier

> Specification for the package [Prettier](https://github.com/prettier/prettier) used in Stark

## Basic features

Stark allows you to prettify your code with `Prettier`.
You can do it whenever you want with the script `prettier-check`

```
$ npm run prettier-check
```

## Prettier configuration

The main Prettier configuration file is located in `stark-build`.
The ones located in `starter`, `showcase` and the other one located in the root just reference the `stark-build` configuration file

## Conflicts with TSLint and Stylelint

The configurations of `TSLint` and `Stylelint` can conflict with `Prettier`.
It's why we use [tslint-config-prettier](https://github.com/alexjoverm/tslint-config-prettier) and
[stylelint-config-prettier](https://github.com/shannonmoeller/stylelint-config-prettier)

To check if your configuration of `TSLint` conflicts with `Prettier`, you can run the script `tslint-check` :

```
$ npm run tslint-check
```

To check if your configuration of `Stylelint` conflicts with `Prettier`, you can run the script `stylelint-check` :

```
$ npm run stylelint-check
```

By default, Stark tslint configuration extends tslint-config-prettier to avoid conflicts and
stylelint configuration extends stylelint-config-prettier for the same reason

## Ignored files

`.prettierignore` file contains all the files which won't be prettified by `Prettier`

## Git hook

Before every commit, `Prettier` will prettify all the modified code.
This is done by using [Husky](https://github.com/typicode/husky)
and [Lint-staged](https://github.com/okonet/lint-staged) to execute `Prettier`
for every changed files before every commit so you won't need to execute it manually
before you commit your code
