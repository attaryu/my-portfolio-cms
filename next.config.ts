import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
	images: {
		remotePatterns: [new URL(process.env.BLOB_HOST as string)],
	},
};

export default nextConfig;
