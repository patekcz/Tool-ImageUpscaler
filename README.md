# Image Upscaler

A simple command-line application to upscale images pixel by pixel using Node.js. Each pixel from the original image is scaled to a specified size in the output image.

## Features

- Upscales images by a specified pixel size.
- Uses the `sharp` library for image processing.
- Easy to use from the command line.

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/patekcz/Tool-ImageUpscaler.git
   cd Tool-ImageUpscaler
   ```

2. Install the dependencies:
   ```bash
   npm install
   ```

3. (Optional) Build the executable for your platform:
   ```bash
   npm run build
   ```

## Usage

To run the application, use the following command:

```bash
node image-upscaler <input_file> <output_file> <pixel_size>
```

### Example

```bash
node image-upscaler input.png output.png 15
```

- `<input_file>`: Path to the original image.
- `<output_file>`: Path where the upscaled image will be saved.
- `<pixel_size>`: Size of the pixel to which the image should be upscaled.
