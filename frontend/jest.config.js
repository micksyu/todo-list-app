module.exports = {
  preset: 'ts-jest',
  roots: ['<rootDir>/src', '<rootDir>/tests'],
  transform: {
    '^.+\\.tsx?$': [
      'ts-jest',
      {
        tsconfig: 'tsconfig.json'
      }
    ]
  },
  // transform: {
  //   '^.+\\.tsx?$': 'ts-jest',
  //   // '^.+\\.jsx?$': 'babel-jest', // Add this line to handle JavaScript files
  // },
  moduleDirectories: ['node_modules', 'src'],
  testRegex: '(/__tests__/.*|(\\.|/)(test|spec))\\.tsx?$',
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  testEnvironment: 'jsdom',
  transformIgnorePatterns: [
    'node_modules/(?!(axios)/)', // Add this line to transform ES modules in node_modules
  ],
  setupFilesAfterEnv: ['<rootDir>/tests/setupTests.ts'],
  // globals: {
  //   'ts-jest': {
  //     tsconfig: 'tsconfig.json',
  //   },
  // },
};
