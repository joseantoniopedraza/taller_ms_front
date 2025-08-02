/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      {
        source: '/api/clients',
        destination: 'http://taller-ms-persistence:3001/clients/',
      },
      {
        source: '/api/clients/',
        destination: 'http://taller-ms-persistence:3001/clients/',
      },
      {
        source: '/api/:path*',
        destination: 'http://taller-ms-persistence:3001/:path*',
      },
    ];
  },
};

export default nextConfig;
