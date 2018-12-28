module.exports = {
  moduleDirectories: [
    'node_modules',
  ],
  testEnvironment: 'node',
  testPathIgnorePatterns: [
    '/node_modules/',
    '/.vscode/',
    '/.history/',
    '/example/',
  ],
  testMatch: [
    '**/?(*.)+(test)\\.js?(x)',
  ],
  timers: 'fake',
  collectCoverage: true,
  coverageDirectory: './coverage/jest',
  coverageThreshold: {
    global: {
      statements: 90,
      branches: 90,
      functions: 90,
      lines: 90,
    },
  },
};
