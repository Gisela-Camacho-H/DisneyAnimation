module.exports = {
    clearMocks: true,
    // An array of file extensions your modules use
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
    testMatch: [
        '<rootDir>/**/__tests__/**/?(*.)(Integration|Unit)js',
        '<rootDir>/**/?(*.)(spec|test).js'
    ],
    testEnvironment: 'node',
    collectCoverageFrom: ['src/**']
};
