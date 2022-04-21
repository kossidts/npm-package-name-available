const https = require("https");

const validate_pkg_name = require("validate-npm-package-name");

const npm_package_name_available = names => {
    // Inforce array
    if (!Array.isArray(names)) {
        names = [names];
    }

    // Generate list of names and similar names by removing one punctuation at a time
    let similar_names = [];
    for (let name of names) {
        similar_names.push(name);

        // No need to remove punctuation from the scope if available
        let unscoped = name.split("/");
        let prefix = unscoped.length > 1 ? unscoped.shift() + "/" : "";
        name = unscoped.join("/");

        let name_forward_lookup = name;
        while (name_forward_lookup.search(/[.\-_]/) != -1) {
            name_forward_lookup = name_forward_lookup.replace(/[.\-_]/, "");
            similar_names.push(prefix + name_forward_lookup);
        }

        let name_backward_lookup = name;
        while (name_backward_lookup.search(/[.\-_][^.\-_]*$/) != -1) {
            name_backward_lookup = name_backward_lookup.replace(/^(.*)([.\-_])([^.\-_]*)$/, "$1$3");
            similar_names.push(prefix + name_backward_lookup);
        }
    }

    // Remove duplicates
    similar_names = new Set(similar_names);
    similar_names = [...similar_names];

    const pkg_name_available = name => {
        return new Promise((resolve, reject) => {
            https
                .request(`https://www.npmjs.com/package/${name}`, { method: "HEAD" }, res => {
                    let is_available = false;
                    if (res.statusCode == 404 || (/^@/.test(name) && res.statusCode == 302)) {
                        is_available = true;
                    }
                    resolve({ [name]: is_available });
                })
                .end();
        });
    };

    const remove_punctuations = str => (str || "").replace(/[.\-_]/g, "");

    let requests = similar_names.map(name => {
        let valid = validate_pkg_name(name);
        if (!valid.validForNewPackages) {
            return { [name]: false };
        }

        return pkg_name_available(name);
    });

    return Promise.all(requests).then(results => {
        let end_result = [];
        for (const name of names) {
            let is_available = results.reduce((acc, cur) => {
                let key = Object.keys(cur)[0];
                if (remove_punctuations(key) == remove_punctuations(name)) {
                    acc = acc && cur[key];
                }
                return acc;
            }, true);
            end_result.push({ [name]: is_available });
        }

        if (end_result.length == 1) {
            return Object.values(end_result[0])[0];
        }

        return end_result;
    });
};

module.exports = npm_package_name_available;
