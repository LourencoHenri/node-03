import { defineConfig } from "vitest/config";
import tsconfiPaths from "vite-tsconfig-paths";

export default defineConfig({
	plugins: [tsconfiPaths()],
});
