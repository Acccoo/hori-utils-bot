const fs = require('fs');
const path = require('path');

/**
 * Return a list of file paths inside a directory
 */
module.exports = (directory, folderOnly = false) => {
    let fileNames = [];
    const files = fs.readdirSync(directory, { withFileTypes: true });

    for (const file of files) {
        const filePath = path.join(directory, file.name);

        if (folderOnly) {
            if (file.isDirectory()) {
                fileNames.push(filePath);
            }
        } else {
            if (file.isFile()) {
                fileNames.push(filePath);
            }
        }
    }

    return fileNames;
};