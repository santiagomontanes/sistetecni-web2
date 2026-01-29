/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "whicjkdnzafebphsuyas.supabase.co",
        pathname: "/storage/v1/object/**",
      },
    ],
  },
};

module.exports = nextConfig;




 
