export default {
  preset: 'ts-jest',
  testEnvironment: 'jest-environment-jsdom',
  testEnvironmentOptions: {
    customExportConditions: [''],
  },
  moduleNameMapper: {
    '\\.(gif|ttf|eot|svg|png)$': '<rootDir>/src/config/testConfig.js',
  },

  // Process *.tsx files with ts-jest
  transform: {
    '^.+\\.tsx?$': 'ts-jest',
  },

  // Set global imports for Jest related packages (ie, js-dom)
  setupFilesAfterEnv: ['<rootDir>/setupTests.ts'],

  // Coverage cmd will fail if under 80% or more than 10 uncovered stmts
  coverageThreshold: {
    global: {
      branches: 80,
      functions: 80,
      lines: 80,
      statements: -10,
    },
  },
};
