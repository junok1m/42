import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],

  server: {
    proxy: {
      "/api/proxy": {
        target: "https://42g.au",
        changeOrigin: true,
        secure: true,

        rewrite: (path) => {
          const url = new URL(path, "http://localhost");
          const apiPath = url.searchParams.get("path");

          if (!apiPath) {
            return path;
          }

          url.searchParams.delete("path");

          const cleanPath = apiPath.replace(/^\/+/, "");
          const remainingQuery = url.searchParams.toString();

          const rewrittenPath = `/api/${cleanPath}${
            remainingQuery ? `?${remainingQuery}` : ""
          }`;

          console.log("Vite proxy rewrite:", path, "→", rewrittenPath);

          return rewrittenPath;
        },
      },
    },
  },
});