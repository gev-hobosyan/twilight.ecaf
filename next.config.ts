import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntel = createNextIntlPlugin();

const nextConfig: NextConfig = {
	reactStrictMode: false,
	images: {
		remotePatterns: [{
			protocol: "https",
			hostname: "br-icy-star-b1cvr8wo.storage.c-5.eu-central-1.aws.neon.tech",
			port: '',
			pathname: "/**"
		}]
	}
  /* config options here */
};

export default withNextIntel(nextConfig);
