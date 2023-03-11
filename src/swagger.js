const swaggerAutogen = require('swagger-autogen')();

const doc = {
  info: {
    title: 'My API',
    description: 'Description',
  },
  // host: 'localhost:8080',
  // schemes: ['http'],
  host: 'disney-movies-db.onrender.com',
  schemes: ['https'],
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

const outputFile = './swagger.json';
const endpointsFiles = ['./routes/index.js'];

swaggerAutogen(outputFile, endpointsFiles, doc);
// Run server after it gets generated
// swaggerAutogen(outputFile, endpointsFiles, doc).then(async () => {
//     await import('./app.js');
//   });