/** @type {import('next').NextConfig} */
const nextConfig = {
  // TypeScript errors should be fixed, not ignored
  // typescript: { ignoreBuildErrors: true } - REMOVED for better code quality
  
  // Image optimization - Next.js automatically compresses images
  images: {
    // Optimizări Next.js activate:
    // - Compresie automată
    // - Conversie în WebP/AVIF când browser-ul suportă
    // - Lazy loading automat
    // - Responsive images cu srcset
    // - Dimensiuni optimizate
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 60,
  },
  
  // Compression is automatically enabled in production for Next.js 13+
  // Gzip/Brotli compression is handled by the deployment platform (Vercel)
  // No explicit compress: true needed - Next.js handles it automatically
}

export default nextConfig
