import DFXWebPackConfig from "dfx.webpack.config";
import type { NextConfig } from "next";
import webpack from "webpack";
DFXWebPackConfig.initCanisterIds();
const EnvPlugin = new webpack.EnvironmentPlugin({
	DFX_NETWORK: "local",
});

const nextConfig: NextConfig = {
	output: "export",
	images: {
		unoptimized: true,
	},
	webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
		config.plugins.push(EnvPlugin);
		return config;
	},
	/* config options here */
	reactStrictMode: true,
};

export default nextConfig;
