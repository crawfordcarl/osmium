const fs = require('fs');
const path = require('path');

const sep = path.sep;

/**
 * Check if the directory exists, and if not, makes the directory.
 *
 * Expects a path, i.e. ./path/
 */
function mkdir(targetDir) {
    try {
        const initDir = path.isAbsolute(targetDir) ? sep : '';

        targetDir.split(sep).reduce((parentDir, childDir) => {
            const curDir = path.resolve(parentDir, childDir);
            if (!fs.existsSync(curDir)) {
                fs.mkdirSync(curDir);
            }

            return curDir;
        }, initDir);
    }
    catch (e) {
        console.log(e);
    }
}

function checkAndAddPath(fileDestination) {
    if (!fs.existsSync(fileDestination)) {
        mkdir(fileDestination.substring(0, fileDestination.lastIndexOf('/')));
    }
}

module.exports = {
    mkdir,
    checkAndAddPath
};