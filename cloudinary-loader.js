/**
 * Custom Cloudinary Image Loader for Next.js
 * 
 * This loader uses Cloudinary's "Fetch" API to optimize images on-the-fly.
 * The Fetch API allows you to deliver any remote image through Cloudinary's CDN
 * without uploading it first.
 * 
 * @param {Object} params - The image loader parameters
 * @param {string} params.src - The source URL of the image
 * @param {number} params.width - The requested width for the image
 * @param {number} params.quality - The requested quality (1-100)
 * @returns {string} The Cloudinary URL for the optimized image
 */
export default function cloudinaryLoader({ src, width, quality }) {
    // Build transformation parameters
    const params = [
        'f_auto', // Automatically select the best format (WebP, AVIF, etc.)
        'c_limit', // Limit dimensions while maintaining aspect ratio
        `w_${width}`, // Set width
        `q_${quality || 'auto'}` // Set quality (auto or specific value)
    ].join(',');

    // Return the Cloudinary Fetch URL
    // Replace 'dwiqrrcyy' with your actual Cloudinary cloud name if needed
    return `https://res.cloudinary.com/dwiqrrcyy/image/fetch/${params}/${src}`;
}
