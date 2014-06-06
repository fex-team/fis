var fs = require("fs"),
    path = require("path"),
    name = "pngquant_native.node",
    tryList, i, count, file;
/**
 *  0.8.0-0.8.25 : 0.8.0
 *  0.9.9-0.10.13 : 0.9.9
 *  0.9.2-0.9.8: 0.9.2
 *  0.9.1-0.9.1: 0.9.1
 *  0.9.0-0.9.0: 0.9.0
 */
vars = [
    '0.8.0',
    '0.9.9'
];
tryList = [
    path.join(__dirname, "build", "Release", name) // build dir
];

for (i = 0, count = vars.length; i < count; i++) {
    tryList.push(path.join(__dirname, "lib", process.platform, process.arch, vars[i], name));
}


count = tryList.length;
for (i = 0; i < count; i++) {
    file = tryList[i];
    if (fs.existsSync(file)) {
        try {
            exports = require(file);
        } catch (e) {
            continue; // try next
        }
        break;
    }
}

if (exports && exports.Pngquant) {
    module.exports = exports;
} else {
    throw new Error("Can't load addon.");
}
