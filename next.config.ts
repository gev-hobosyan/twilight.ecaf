import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntel = createNextIntlPlugin();

const nextConfig: NextConfig = {
	reactStrictMode: false
  /* config options here */
};

export default withNextIntel(nextConfig);
