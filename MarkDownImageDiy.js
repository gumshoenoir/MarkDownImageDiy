#!/usr/bin/env node
/**
 * Hugo Page Bundle Image Paste Utility for VS Code
 * Author: gumshoenoir (https://github.com/gumshoenoir)
 * For use with Markdown Image by Hancel.Lin https://marketplace.visualstudio.com/items?itemName=hancel.markdown-image
 *
 * Automatically saves pasted images into the correct Hugo Page Bundle directory
 * using deterministic filenames:
 *
 *   <bundle-name>-image-1.png
 *   <bundle-name>-image-2.png
 *
 * INSTALLATION:
 * 1. Install 'Markdown Image' (hancel.markdown-image)
 * 2. In settings.json:
 *      "markdown-image.base.uploadMethod": "DIY",
 *      "markdown-image.DIY.path": "/absolute/path/to/this/script.js"
 *
 * USAGE:
 * - Copy an image to your clipboard (Pinta, Firefox, GNOME Screenshot, etc.)
 * - Press Alt+Shift+V inside any Markdown file
 * - The image is saved into the page bundle with a clean relative link returned
 */

const path = require('path');
const fs = require('fs');

module.exports = async function (filePath, savePath, markdownPath) {
    try {
        // 1. Identify the Hugo Page Bundle directory
        const fileFolder = path.dirname(markdownPath);
        const folderName = path.basename(fileFolder);

        // 2. Determine extension (clipboard may not always be PNG)
        const ext = path.extname(filePath) || '.png';

        // 3. Loop to find next available counter
        let counter = 1;
        let targetFileName = `${folderName}-image-${counter}${ext}`;
        let targetFullPath = path.join(fileFolder, targetFileName);

        while (fs.existsSync(targetFullPath)) {
            counter++;
            targetFileName = `${folderName}-image-${counter}${ext}`;
            targetFullPath = path.join(fileFolder, targetFileName);
        }

        // 4. Copy from temp clipboard path → bundle directory
        fs.copyFileSync(filePath, targetFullPath);

        // 5. Cleanup temp file if it still exists
        if (fs.existsSync(filePath)) {
            fs.unlinkSync(filePath);
        }

        // 6. Return clean relative Markdown link
        return `./${targetFileName}`;

    } catch (err) {
        return `Error: ${err.message}`;
    }
};
