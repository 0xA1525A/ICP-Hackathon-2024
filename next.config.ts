import type { NextConfig } from "next";
import path from "node:path";
const nextConfig: NextConfig = {
	output: "export",
	images: {
		unoptimized: true,
	},
	webpack: (config, { isServer }) => {
		console.log(path.resolve(__dirname, "../declarations"));
		config.resolve.alias = {
			...config.resolve.alias,
			declarations: path.resolve(__dirname, "../declarations"),
		};
		return config;
	},
	/* config options here */
	reactStrictMode: true,
};

export default nextConfig;
