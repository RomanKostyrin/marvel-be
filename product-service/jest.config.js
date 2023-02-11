module.exports = {
  testEnvironment: 'node',
  transformIgnorePatterns: ['/node_modules/(?!truncate-json)$'],
  testMatch: ['**/?(*.)+(test).ts'],
  moduleFileExtensions: ['ts', 'json', 'js'],
  moduleDirectories: ['node_modules', '<rootDir>/src'],
  moduleNameMapper: {
    '@functions/(.*)$': '<rootDir>/src/functions/$1',
    '@libs/(.*)$': '<rootDir>/src/libs/$1',
  },
  transform: {
    '^.+\\.(t|j)sx?$': '@swc/jest',
  },
};
