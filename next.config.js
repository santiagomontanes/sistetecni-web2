const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
let supabaseHostname = "whicjkdnzafebphsuyas.supabase.co";

if (supabaseUrl) {
  try {
    supabaseHostname = new URL(supabaseUrl).hostname;
  } catch (error) {
    console.warn("Invalid NEXT_PUBLIC_SUPABASE_URL, falling back to default hostname.");
  }
}

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: supabaseHostname,
        pathname: "/storage/v1/object/**"
      }
    ]
  }
};

module.exports = nextConfig;















 
