const sharp = require('sharp');
const path = require('path');
const fs = require('fs');

const input = path.join(__dirname, '..', 'public', 'Logo.webp');
const appDir = path.join(__dirname, '..', 'src', 'app');

if (!fs.existsSync(appDir)) {
    console.error('src/app directory not found!');
    process.exit(1);
}

async function generateAppIcons() {
    console.log('Generating App Router icons from Logo.webp...');

    try {
        // icon.png (192x192) - Google recommends 192px (multiple of 48px)
        await sharp(input)
            .resize(192, 192, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
            .toFormat('png')
            .toFile(path.join(appDir, 'icon.png'));
        console.log('Created src/app/icon.png (192x192)');

        // apple-icon.png (180x180) - Apple devices
        await sharp(input)
            .resize(180, 180, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
            .toFormat('png')
            .toFile(path.join(appDir, 'apple-icon.png'));
        console.log('Created src/app/apple-icon.png (180x180)');

        // opengraph-image.png (1200x630) - Social Media & Google
        await sharp(input)
            .resize(1200, 630, { fit: 'contain', background: { r: 20, g: 20, b: 20, alpha: 1 } })
            .toFormat('png')
            .toFile(path.join(appDir, 'opengraph-image.png'));
        console.log('Created src/app/opengraph-image.png (1200x630)');

    } catch (error) {
        console.error('Error generating icons:', error);
    }
}

generateAppIcons();
