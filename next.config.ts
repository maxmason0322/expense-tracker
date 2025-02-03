import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  compiler: {
    styledComponents: true,
  },
  // experimental: {
  //   reactCompiler: true,
  // },
  webpack(config) {
    // Find existing SVG loader configuration
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const { options: loaderOptions } = config.module.rules.find((rule: any) =>
      rule?.test?.test?.(".svg")
    );
    // Convert SVG files into React components when `?inline` is appended to the import
    config.module.rules.push({
      test: /\.svg$/,
      use: ["@svgr/webpack"],
      resourceQuery: /inline/,
    });
    // Handle all other SVG files using Next.js's image loader
    config.module.rules.push({
      test: /\.svg$/,
      resourceQuery: { not: [/inline/] },
      loader: "next-image-loader",
      options: loaderOptions,
    });

    return config;
  },
};

export default nextConfig;
