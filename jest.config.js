module.exports = {
    clearMocks: true,
    moduleFileExtensions: ['js', 'jsx'],
    coveragePathIgnorePatterns: [
        '<rootDir>/dist/',
        '<rootDir>/node_modules/',
        '<rootDir>/docs/',
        '<rootDir>/build/'
    ],
    testPathIgnorePatterns: [
        '<rootDir>/dist/',
        '<rootDir>/node_modules/',
        '<rootDir>/docs/',
        '<rootDir>/build/'
    ],
    
    testEnvironment: 'node',
    collectCoverageFrom: ['src/**']
};