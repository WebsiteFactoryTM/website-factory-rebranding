import path from "node:path"
import { defineConfig } from "vitest/config"

export default defineConfig({
  test: {
    include: ["tests/**/*.test.ts"],
    environment: "node",
    server: { deps: { inline: ["next-intl", "next"] } },
  },
  resolve: { alias: { "@": path.resolve(__dirname) } },
})
