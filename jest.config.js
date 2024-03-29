/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  testRegex: '(/test/.*|(\\.|/)spec)\\.ts$',
  coveragePathIgnorePatterns: ['/src/index.ts'],
};
