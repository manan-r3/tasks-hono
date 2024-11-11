import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url); // get the resolved path to the file
const __dirname = path.dirname(__filename); // get the name of the directory

import { argv } from "process";

import { build } from "esbuild";
import { aliasPath } from "esbuild-plugin-alias-path";

import type { BuildOptions } from "esbuild";

const options: BuildOptions = {
  entryPoints: [path.resolve(__dirname, "../src/index.ts")],
  minify: argv[2] === "production",
  format: "esm",
  bundle: true,
  target: "node20",
  platform: "node",
  external: [],
  outfile: path.resolve(__dirname, "../dist/index.js"),
  plugins: [
    aliasPath({
      alias: {
        "@": path.resolve(__dirname, "../src"),
      },
    }),
  ],
  banner: {
    js: 'import path from "path"; import { createRequire as topLevelCreateRequire } from "module";import { fileURLToPath } from "url"; const require = topLevelCreateRequire(import.meta.url);const __filename = fileURLToPath(import.meta.url);const __dirname = path.dirname(__filename);',
  },
};

build(options).catch((err) => {
  process.stderr.write(err.stderr);
  process.exit(1);
});
