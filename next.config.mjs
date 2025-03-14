/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    eslint: { ignoreDuringBuilds: true },
    typescript: { ignoreBuildErrors: true },
    webpack: (config) => {
        config.ignoreWarnings = [
            /Cannot read properties of null \(reading 'removeLayer'\)/,
            /Routing error: {}/,
        ];
        return config;
    },
};

export default nextConfig;
