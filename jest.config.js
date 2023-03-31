module.exports = {
    preset: '@shelf/jest-mongodb',
    // otras opciones de configuración de Jest
    testTimeout: 10000, // Aumentar el tiempo límite a 60 segundos

    testPathIgnorePatterns: [
      '<rootDir>/dist/',
      '<rootDir>/node_modules/',
      '<rootDir>/docs/',
      '<rootDir>/build/'
  ],
}