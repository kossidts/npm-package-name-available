# npm-package-name-available

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
