const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "books.google.com",
                pathname: "/**",
            },
            {
                protocol: "http",
                hostname: "books.google.com",
                pathname: "/**",
            },
        ],
    },
};

export default nextConfig;