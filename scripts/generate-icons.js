import sharp from 'sharp';
import { promises as fs } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const STATIC_DIR = join(__dirname, '..', 'static');

async function generateImages() {
    const svgBuffer = await fs.readFile(join(STATIC_DIR, 'robot-icon.svg'));
    
    // Generate favicon.png (32x32)
    await sharp(svgBuffer)
        .resize(32, 32)
        .png()
        .toFile(join(STATIC_DIR, 'favicon.png'));
    
    // Generate apple-touch-icon.png (180x180)
    await sharp(svgBuffer)
        .resize(180, 180)
        .png()
        .toFile(join(STATIC_DIR, 'apple-touch-icon.png'));
    
    // Create a white background image for OG image
    const ogImage = await sharp({
        create: {
            width: 1200,
            height: 630,
            channels: 4,
            background: { r: 255, g: 255, b: 255, alpha: 1 }
        }
    }).png();
    
    // Add the robot icon and text to OG image
    await ogImage
        .composite([
            {
                input: svgBuffer,
                top: 165,
                left: 100,
                width: 300,
                height: 300
            },
            {
                input: Buffer.from(`
                    <svg width="1200" height="630">
                        <text x="440" y="315" font-family="Arial" font-size="72" font-weight="bold" fill="#5663f6">AutoHub</text>
                        <text x="440" y="375" font-family="Arial" font-size="32" fill="#666">Python Automation Scripts Platform</text>
                    </svg>
                `),
                top: 0,
                left: 0
            }
        ])
        .toFile(join(STATIC_DIR, 'og-image.png'));
    
    console.log('Generated all images successfully!');
}

generateImages().catch(console.error);
