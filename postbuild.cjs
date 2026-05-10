const fs = require("fs")
const path = require("path")

const stylesDir = path.join(__dirname, "styles")
const distCssDir = path.join(__dirname, "dist", "css")

if (!fs.existsSync(distCssDir)) {
  fs.mkdirSync(distCssDir, { recursive: true })
}

const cssFiles = fs.readdirSync(stylesDir).filter((f) => f.endsWith(".css"))
for (const file of cssFiles) {
  fs.copyFileSync(path.join(stylesDir, file), path.join(distCssDir, file))
}

console.log(`✓ Copied ${cssFiles.length} CSS files to dist/css/`)
