const { defaults } = require('jest-config');

module.exports = {
    ...defaults,
    preset: 'ts-jest',
    coverageDirectory: './coverage',
    collectCoverageFrom: [
        '**/*.{ts,tsx}',
        '!**/test/**',
        '!**/index.{ts,tsx}',
        '!**/examples/*.{ts,tsx}',
    ],
    testMatch: [
        '**/?(*.)+(spec).[jt]s?(x)',
    ],
    moduleNameMapper: { '^src/(.*)$': '<rootDir>/src/$1' },
    testEnvironment: 'jsdom',
};
