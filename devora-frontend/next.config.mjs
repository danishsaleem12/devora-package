/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      // /privacy used to be a second, shorter privacy page; /privacy-policy is the single one now
      { source: "/privacy", destination: "/privacy-policy", permanent: true },
    ];
  },
};

export default nextConfig;
