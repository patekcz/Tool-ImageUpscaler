const sharp = require('sharp');

async function upscaleImage(inputPath, outputPath, scaleFactor) {
    try {
        // Načtení původního obrázku
        const image = sharp(inputPath);
        const metadata = await image.metadata();

        const newWidth = metadata.width * scaleFactor;
        const newHeight = metadata.height * scaleFactor;

        console.log('Original size:', metadata.width, 'x', metadata.height);
        console.log('New size:', newWidth, 'x', newHeight);
        console.log('Processing...');

        // Zvětšení obrázku bez interpolace
        await image
            .raw()
            .toBuffer()
            .then(buffer => {
                // Vytvoření nového prázdného obrázku
                const newBuffer = Buffer.alloc(newWidth * newHeight * 4);

                // Procházení každého pixelu původního obrázku
                for (let y = 0; y < metadata.height; y++) {
                    for (let x = 0; x < metadata.width; x++) {
                        // Pozice pixelu v původním obrázku
                        const pos = (y * metadata.width + x) * 4;

                        // Kopírování hodnot pixelu do nového obrázku
                        for (let ny = 0; ny < scaleFactor; ny++) {
                            for (let nx = 0; nx < scaleFactor; nx++) {
                                const newPos = ((y * scaleFactor + ny) * newWidth + (x * scaleFactor + nx)) * 4;
                                newBuffer[newPos] = buffer[pos];         // R
                                newBuffer[newPos + 1] = buffer[pos + 1]; // G
                                newBuffer[newPos + 2] = buffer[pos + 2]; // B
                                newBuffer[newPos + 3] = buffer[pos + 3]; // A
                            }
                        }
                    }
                }

                // Vytvoření nového obrázku z bufferu
                return sharp(newBuffer, {
                    raw: {
                        width: newWidth,
                        height: newHeight,
                        channels: 4
                    }
                })
                .png()
                .toFile(outputPath);
            });

        console.log('Image successfully upscaled!');
    } catch (error) {
        console.error('An error occurred:', error);
        process.exit(1);
    }
}

// Nový kód pro zpracování argumentů
function printHelp() {
    console.log(`
Usage: node index.js <input_file> <output_file> <pixel_size>

        Example: node index.js input.png output.png 15
    `);
}

// Zpracování argumentů
const args = process.argv.slice(2);

if (args.length === 0 || args.includes('--help') || args.includes('-h')) {
    printHelp();
    process.exit(0);
}

if (args.length < 2) {
    console.error('Error: Not enough arguments!');
    printHelp();
    process.exit(1);
}

const inputFile = args[0];
const outputFile = args[1];
const pixelSize = parseInt(args[2]) || 15;

if (isNaN(pixelSize) || pixelSize < 1) {
    console.error('Error: Invalid pixel size!');
    process.exit(1);
}

console.log(`Processing image:
Input: ${inputFile}
Output: ${outputFile}
Pixel size: ${pixelSize}x${pixelSize}
`);

upscaleImage(inputFile, outputFile, pixelSize);
