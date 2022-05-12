/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  verbose: true,
  automock: true,
  collectCoverage: true,
  collectCoverageFrom: ['**/*.tsx', '!**/node_modules/**'],
  moduleNameMapper: {
    "\\.(css|less|scss)$": "identity-obj-proxy",
    "\\.(jpg|jpeg|png|gif)$": "<rootDir>/src/__mocks__/fileMock.ts"
  }
}
