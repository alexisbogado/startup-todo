module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  coverageReporters: ['html'],
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1'
  },
  resetMocks: true
}
