#!/usr/bin/env node

const args = process.argv.slice(2, process.argv.length);
if (!args.length) {
    process.exit(1);
}

const npm_package_name_available = require("../index.js");

npm_package_name_available(args).then(console.log);
process.exitCode = 0;
