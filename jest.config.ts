import type { Config } from "jest";
import nextJest from "next/jest.js";

const createJestConfig = nextJest({
  // Provide the path to your Next.js app to load next.config.js and .env files in your test environment
  dir: "./",
});

// Add any custom config to be passed to Jest
const config: Config = {
  coverageProvider: "v8",
  testEnvironment: "jsdom",
  setupFilesAfterEnv: ["<rootDir>/jest.setup.ts"], // Ensure setup file is loaded
  // testMatch: ["**/__tests__/**/*.test.ts", "**/__tests__/**/*.test.tsx"],
  // transformIgnorePatterns: [
  //   "**/node_modules/(?!lucide-react|@some-other-esm-lib)", // Allow Jest to transform ESM modules
  // ],
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/src/$1", // Resolves @/ to src/
    "^@root/(.*)$": "<rootDir>/$1", // Resolves @root/ to project root
  },
  // transform: {
  //   "^.+\\.(ts|tsx)$": ["@swc/jest"], // Use SWC for faster TypeScript support
  // },
};

// createJestConfig is exported this way to ensure that next/jest can load the Next.js config which is async
// export default createJestConfig(config);
const asyncConfig = createJestConfig(config);

// and wrap it...
module.exports = async () => {
  const config = await asyncConfig();
  config.transformIgnorePatterns = [
    "/node_modules/(?!query-string|decode-uri-component|filter-obj|split-on-first)",
  ];
  return config;
};
