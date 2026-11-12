import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  compiler: {
    styledComponents: true,
  },
  experimental: {
    // O índice do hugeicons exporta ~6 mil ícones e não está na lista que o
    // Next otimiza por padrão; sem isso cada rota compila todos eles.
    optimizePackageImports: ["@hugeicons/core-free-icons"],
  },
};

export default nextConfig;
