module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  transform: {
    '^.+\\.(ts|tsx)$': [
      'ts-jest',
      {
        tsconfig: '<rootDir>/tsconfig.app.json'
      }
    ]
  },
  moduleNameMapper: {
    '^~/(.*)$': '<rootDir>/src/$1'
  },
  testMatch: ['<rootDir>/src/tests/**/*.test.tsx'],
  setupFiles: ['<rootDir>/jest.setup.cjs'],
  transformIgnorePatterns: [
    '/node_modules/(?!react-hot-toast|lucide-react|uidotdev)/' // Add uidotdev/usehooks here
  ]
}
