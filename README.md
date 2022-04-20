# npm-package-name-available

[![License][license-image]][license-url] [![NPM Package Version][npm-image-version]][npm-url] ![GitHub top language][language-image] ![Size][size-image] ![Last Commit][commit-image]

checks if a name is a valid npm package name **and** if it's available to be used to push a new package to npm.

## Usage without installation

```sh
$ npx npm-package-name-available name

# Or multiple names at once
$ npx npm-package-name-available name alt-name alt-name-2 ... alt-name-n
```

## Installation

```bash
$ npm i npm-package-name-available
```

## Usage

##### Require CommonJS (default)

```js
const npm_package_name_available = require("npm-package-name-available");
```

##### Import ES-Module (default)

```js
import npm_package_name_available from "npm-package-name-available";
```

##### Import ES-Module (named)

```js
import { npm_package_name_available } from "npm-package-name-available";
```

### Checks

Check for one name at a time returns a boolean value, for example

```js
npm_package_name_available("my-package-name");
//=> true
```

```js
npm_package_name_available("express");
//=> false
```

Checks for multiple names at once, will return an array of objects, for example

```js
npm_package_name_available([
    "http-status-code",
    "http-code",
    "readable-http-status-code",
    "http-status-quo",
    "status-quo",
    "@kdts/http-status-code",
    //
]).then(results => {
    console.log(results);
});

//=> [
//   { 'http-status-code': false },
//   { 'http-code': false },
//   { 'readable-http-status-code': true },
//   { 'http-status-quo': true },
//   { 'status-quo': false },
//   { '@kdts/http-status-code': true }
// ]
```

## License

See [LICENSE][license-url].

## Copyright

Copyright &copy; 2022. Kossi D. T. Saka.

[npm-image-version]: https://img.shields.io/npm/v/npm-package-name-available.svg
[npm-image-downloads]: https://img.shields.io/npm/dm/npm-package-name-available.svg?color=purple
[npm-url]: https://npmjs.org/package/npm-package-name-available
[license-image]: https://img.shields.io/github/license/kossidts/npm-package-name-available
[license-url]: https://github.com/kossidts/npm-package-name-available/blob/master/LICENSE
[language-image]: https://img.shields.io/github/languages/top/kossidts/npm-package-name-available?color=yellow
[size-image]: https://img.shields.io/github/repo-size/kossidts/npm-package-name-available?color=light
[commit-image]: https://img.shields.io/github/last-commit/kossidts/npm-package-name-available
[actions-url]: https://github.com/kossidts/npm-package-name-available/actions
[workflow-image]: https://github.com/kossidts/npm-package-name-available/actions/workflows/node.js.yml/badge.svg
[workflow-image-2]: https://github.com/kossidts/npm-package-name-available/workflows/Node.js%20CI/badge.svg
