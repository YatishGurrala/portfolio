import type { NextConfig } from "next";
import packageJson from "./package.json";

const repositoryName = packageJson.name;
const useGithubPagesBasePath = process.env.GITHUB_ACTIONS === "true" && process.env.NEXT_PUBLIC_CUSTOM_DOMAIN !== "true";
const basePath = useGithubPagesBasePath ? `/${repositoryName}` : "";

const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  basePath,
  assetPrefix: basePath,
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
