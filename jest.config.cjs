module.exports = {
  testEnvironment: "jsdom",
  transform: { "^.+\\.[jt]sx?$": "babel-jest" },
  setupFilesAfterEnv: ["<rootDir>/src/test/setup.js"],
  moduleNameMapper: { "\\.(css|less|scss)$": "<rootDir>/src/test/styleMock.cjs" },
  testMatch: ["<rootDir>/src/**/*.test.[jt]s?(x)"],
  clearMocks: true,
};
