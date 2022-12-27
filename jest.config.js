require('dotenv').config({
  path: '.env.example'
})

module.exports = {
  silent: false,
  verbose: false,
  collectCoverage: true,
  coverageDirectory: 'coverage',
  coverageThreshold: {
    global: {
      branches: 90,
      functions: 90,
      lines: 90,
      statements: 90
    }
  },
  collectCoverageFrom: [
    'src/store/Github/GithubSlice.ts',
    'src/styled/Common.tsx'
  ],
  coverageProvider: 'babel',
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  testTimeout: 10000,
  testMatch: ['**/__tests__/**/*.[jt]s?(x)', '**/?(*.)+(spec).[jt]s?(x)'],
  testPathIgnorePatterns: ['/node_modules/'],
  transform: {
    '^.+\\.tsx?$': 'ts-jest',
  }
}
