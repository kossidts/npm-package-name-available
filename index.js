const https = require("https");

const validate_pkg_name = require("validate-npm-package-name");

const npm_package_name_available = names => {
    if (!Array.isArray(names)) {
        names = [names];
    }

    let requests = names.map(name => {
        let valid = validate_pkg_name(name);
        if (!valid.validForNewPackages) {
            return { [name]: false };
        }

        const check_availablitiy = (pkg_name, similar_name) => {
            if ("undefined" == typeof similar_name) {
                similar_name = pkg_name;
            }
            return new Promise((resolve, reject) => {
                https
                    .request(`https://www.npmjs.com/package/${similar_name}`, { method: "HEAD" }, res => {
                        // console.log("headers:", res.headers);
                        // console.log("statusCode:", res.statusCode, similar_name, res.headers.location);
                        let is_available = false;
                        if (res.statusCode == 404 || (/^@/.test(similar_name) && res.statusCode == 302)) {
                            is_available = true;
                        }

                        resolve({ [pkg_name]: is_available });
                    })
                    .end();
            });
        };

        let no_punctuation_conflict_name = name.replace(/[.\-_]/g, "");
        if (no_punctuation_conflict_name !== name) {
            return Promise.all([name, no_punctuation_conflict_name].map(_name => check_availablitiy(name, _name)));
        }

        return check_availablitiy(name);
    });

    return Promise.all(requests).then(results => {
        results = results.map(result => {
            if (Array.isArray(result)) {
                let obj = result.shift();
                let name = Object.keys(obj)[0];
                // There are max two elements
                obj[name] = obj[name] && result[0][name];
                result = obj;
            }
            return result;
        });
        if (names.length == 1) {
            results = results[0][names[0]];
        }
        return results;
    });
};

module.exports = npm_package_name_available;
