import DFXWebPackConfig from "dfx.webpack.config";
import type { NextConfig } from "next";
import webpack from "webpack";
const EnvPlugin = new webpack.EnvironmentPlugin({
	DFX_NETWORK: "local",
	...(DFXWebPackConfig.initCanisterIds())
});

console.log(EnvPlugin)
const nextConfig: NextConfig = {
	output: "export",
	images: {
		unoptimized: true,
	},
	webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
		console.log(EnvPlugin)
		config.plugins.push(EnvPlugin);
		
		return config;
	},
	reactStrictMode: true,
};

export default nextConfig;
