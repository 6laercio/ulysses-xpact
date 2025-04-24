import { defineConfig } from "tsup";

export default defineConfig({
  entry: ["src/background.ts", "src/popup/popup.ts", "src/block/block.ts"],
  outDir: "dist",
  format: ["esm"],
  target: "es2022",
  splitting: false,
  sourcemap: true,
  clean: true,
  dts: false,
  minify: false,

  publicDir: "public",
});
