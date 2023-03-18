const swaggerAutogen = require('swagger-autogen')();
require('dotenv').config();

const doc = {
  info: {
    title: 'My API',
    description: 'Description',
  },
  // host: 'localhost:8080',
  // schemes: ['http'],
  host: process.env.HOST,
  schemes: [process.env.SCHEME],
  // securityDefinitions: {
  //   oAuthSample: {
  //     type: 'oauth2',
  //     authorizationUrl: 'https://disney-movie-db.onrender.com/api-docs',
  //     flow: 'implicit',
  //     scopes: {
  //       write_books: ''
  //     }
  //   }
  // }
};

const outputFile = './src/swagger.json';
const endpointsFiles = ['./src/routes/index.js'];

swaggerAutogen(outputFile, endpointsFiles, doc);
// Run server after it gets generated
// swaggerAutogen(outputFile, endpointsFiles, doc).then(async () => {
//     await import('./app.js');
//   });