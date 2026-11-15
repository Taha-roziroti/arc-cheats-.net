import fs from 'node:fs';
import path from 'node:path';
import sharp from 'sharp';

const root = process.cwd();
const publicDir = path.join(root, 'public');
const source = path.join(publicDir, 'brand', 'favicon-source.png');
const legacySource = path.join(publicDir, 'brand', 'abi-logo-source.webp');
const iconSource = fs.existsSync(source) ? source : legacySource;

/** Matches logo plate and site.webmanifest theme_color. */
const ICON_BG = { r: 0, g: 0, b: 0, alpha: 1 };
const BRAND_LABEL = 'ARC Raiders';

if (!fs.existsSync(iconSource)) {
  console.error('generate-brand-icons: missing source at', iconSource);
  process.exit(1);
}

function resizeToSquare(size) {
  return sharp(iconSource)
    .resize(size, size, {
      fit: 'contain',
      background: ICON_BG,
    })
    .png();
}

await resizeToSquare(180).toFile(path.join(publicDir, 'apple-touch-icon.png'));
await resizeToSquare(32).toFile(path.join(publicDir, 'favicon-32.png'));
await resizeToSquare(16).toFile(path.join(publicDir, 'favicon-16.png'));
await resizeToSquare(32).toFile(path.join(publicDir, 'favicon.ico'));

const png180 = await resizeToSquare(180).toBuffer();
const base64 = png180.toString('base64');
const faviconSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 180 180" role="img" aria-label="${BRAND_LABEL}">
  <rect width="180" height="180" fill="#000000"/>
  <image href="data:image/png;base64,${base64}" width="180" height="180"/>
</svg>
`;
fs.writeFileSync(path.join(publicDir, 'favicon.svg'), faviconSvg, 'utf8');
fs.writeFileSync(path.join(publicDir, 'logo.svg'), faviconSvg, 'utf8');

console.log('Brand icons generated from', path.relative(root, iconSource));