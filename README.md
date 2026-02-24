# MarkDownImageDiy

For use with Markdown Image by Hancel.Lin  
https://marketplace.visualstudio.com/items?itemName=hancel.markdown-image

A custom DIY script for the Markdown Image VS Code extension that fixes image‑paste workflows for Hugo page bundles, SSH remotes, and multi‑platform clipboard sources.

Full write‑up and background on this workflow:  
https://gumshoenoir.com/posts/hancel-markdown-image-extension-diy/

Although originally built to solve Hugo‑specific issues, this script is not limited to Hugo.  
It works with any Markdown‑based workflow where you want predictable, local image placement and clean relative links.

This script ensures:

- images always save into the same folder as the current Markdown file  
- Hugo page bundles (index.md + colocated images) work automatically  
- filenames follow a deterministic pattern: `<bundle-name>-image-<counter>.<ext>`  
- relative Markdown links are correct  
- the workflow behaves identically on local, SSH remote, Wayland, and X11  

This repo contains the standalone DIY script used with the extension’s markdown-image.diy setting.

---

## Why this exists

The default Markdown Image extension works well for simple folders, but breaks in real‑world setups:

- Hugo page bundles require images to live next to index.md  
- SSH remote editing causes path resolution issues  
- VS Code extensions often normalize paths incorrectly  
- Some clipboard sources (Wayland, X11, macOS) behave inconsistently  
- The default filename generator is nondeterministic  

This DIY script replaces the extension’s internal logic with a predictable, cross‑platform workflow.

---

## Features

- Hugo page bundle aware  
  Automatically detects index.md and saves images into the bundle folder.

- Deterministic filenames  
  Uses the pattern:  
  `<folderName>-image-1.png`  
  `<folderName>-image-2.png`  
  The script increments the counter until a free filename is found.

- Correct relative Markdown links  
  Returns links like: `./my-post-image-1.png`

- Works over SSH Remote  
  No path drift, no temp folders, no broken links.

- Cross‑platform clipboard support  
  Works on Linux (Wayland/X11), macOS, and Windows.

- Zero dependencies  
  Pure Node.js script executed by the extension.

- Not Hugo‑specific  
  Works with Obsidian, MkDocs, Jekyll, plain Markdown folders, and any other Markdown‑based system.

---

## Installation

1. Install the VS Code extension: Markdown Image by Hancel.Lin

2. Enable DIY mode in your VS Code settings:

{
  "markdown-image.diy": {
    "enable": true,
    "script": "/absolute/path/to/MarkDownImageDiy.js"
  }
}

3. Clone this repo somewhere stable:

git clone https://github.com/gumshoenoir/MarkDownImageDiy.git

4. Point the extension to the script:

{
  "markdown-image.diy.script": "/path/to/MarkDownImageDiy/MarkDownImageDiy.js"
}

---

## Hugo Usage (Recommended: Add as a Git Submodule)

If you want this script available inside your Hugo project (local or SSH remote), add it as a submodule:

cd your-hugo-site  
git submodule add https://github.com/gumshoenoir/MarkDownImageDiy.git tools/MarkDownImageDiy

This creates:
```
your-hugo-site/  
└── tools/  
    └── MarkDownImageDiy/  
        ├── MarkDownImageDiy.js  
        └── README.md  
```
Then update your VS Code settings:

{
  "markdown-image.diy.script": "${workspaceFolder}/tools/MarkDownImageDiy/MarkDownImageDiy.js"
}

Why this is ideal for Hugo:

- Works seamlessly with Hugo page bundles  
- Keeps tooling versioned inside your repo  
- Works over SSH Remote without path issues  
- Ensures deterministic image placement for all contributors  

---

## How it works

The extension passes clipboard image data to this script.  
The script:

1. Identifies the page bundle directory  
2. Determines the correct output folder  
3. Extracts the clipboard image extension  
4. Generates a deterministic filename using `<folderName>-image-<counter>.<ext>`  
5. Copies the image into the bundle  
6. Deletes the temp clipboard file  
7. Returns a clean relative Markdown link  

The result is a clean, predictable paste workflow.

---

## Example

Pasting an image inside:

content/posts/my-post/index.md

Produces:

content/posts/my-post/my-post-image-1.png

And inserts:

`![](./my-post-image-1.png)`

---

## Repo Structure

MarkDownImageDiy/  
├── MarkDownImageDiy.js   # The DIY script  
├── LICENSE               # MIT License  
└── README.md             # This file  

---

## Contributing

This script is intentionally small and focused.  
If you want to extend it (e.g., custom filename patterns, subfolder rules, or Hugo shortcodes), feel free to open an issue or PR.

However I'm hoping this script will become obseleted with enhancments to the extension and the vscode api

---

## Related

Markdown Image extension:  
https://marketplace.visualstudio.com/items?itemName=hancel.markdown-image

Hugo Page Bundles:  
https://gohugo.io/content-management/page-bundles/

---

## License (MIT)

Copyright (c) 2026 gumshoenoir

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights  
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell  
copies of the Software, and to permit persons to whom the Software is  
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in  
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR  
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,  
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE  
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER  
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING  
FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER  
DEALINGS IN THE SOFTWARE.
