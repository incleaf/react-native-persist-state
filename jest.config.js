/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",
  testPathIgnorePatterns: ["/dist/"],
  transformIgnorePatterns: [
    "<rootDir>/node_modules/(?!(@react-native|react-native|recoil)/)",
  ],
};
