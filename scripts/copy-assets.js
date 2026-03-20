const fs = require("fs");
const path = require("path");

const root = path.resolve(__dirname, "..");
const srcDir = path.join(root, "Assets", "images");
const destDir = path.join(root, "public", "Assets", "images");

function copyDir(src, dest) {
  if (!fs.existsSync(src)) {
    console.log(`Source folder not found: ${src}`);
    return;
  }
  fs.mkdirSync(dest, { recursive: true });
  const items = fs.readdirSync(src);
  items.forEach((item) => {
    const s = path.join(src, item);
    const d = path.join(dest, item);
    const stat = fs.statSync(s);
    if (stat.isDirectory()) {
      copyDir(s, d);
    } else {
      fs.copyFileSync(s, d);
      console.log(`Copied ${s} -> ${d}`);
    }
  });
}

try {
  copyDir(srcDir, destDir);
  console.log("Assets copy complete.");
} catch (err) {
  console.error("Failed to copy assets:", err);
  process.exitCode = 1;
}
