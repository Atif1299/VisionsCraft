const fs = require('fs');
const path = require('path');
const imagemin = require('imagemin');
const imageminMozjpeg = require('imagemin-mozjpeg');
const imageminPngquant = require('imagemin-pngquant');
const imageminSvgo = require('imagemin-svgo');
const imageminWebp = require('imagemin-webp');

const publicDir = path.join(__dirname, '../public');
const imagesDir = path.join(publicDir, 'images');

async function optimizeImages() {
    console.log('🖼️  Starting image optimization...');
    
    try {
        // Optimize images in the images directory
        const files = await imagemin([`${imagesDir}/**/*.{jpg,jpeg,png,svg}`], {
            destination: imagesDir,
            plugins: [
                imageminMozjpeg({
                    quality: 85,
                    progressive: true
                }),
                imageminPngquant({
                    quality: [0.6, 0.8],
                    speed: 4
                }),
                imageminSvgo({
                    plugins: [
                        { removeViewBox: false },
                        { removeEmptyAttrs: false }
                    ]
                })
            ]
        });
        
        console.log(`✅ Optimized ${files.length} images`);
        
        // Generate WebP versions for better compression
        const webpFiles = await imagemin([`${imagesDir}/**/*.{jpg,jpeg,png}`], {
            destination: imagesDir,
            plugins: [
                imageminWebp({
                    quality: 85,
                    method: 6
                })
            ]
        });
        
        console.log(`✅ Generated ${webpFiles.length} WebP versions`);
        
        // Create a manifest file for optimized images
        const manifest = {
            optimized: files.map(f => f.destinationPath),
            webp: webpFiles.map(f => f.destinationPath),
            timestamp: new Date().toISOString()
        };
        
        fs.writeFileSync(
            path.join(publicDir, 'image-manifest.json'),
            JSON.stringify(manifest, null, 2)
        );
        
        console.log('✅ Image optimization completed successfully!');
        
    } catch (error) {
        console.error('❌ Error optimizing images:', error);
        process.exit(1);
    }
}

// Run the optimization
optimizeImages(); 