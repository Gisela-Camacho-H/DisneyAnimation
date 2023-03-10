const swaggerAutogen = require('swagger-autogen')();

const doc = {
  info: {
    title: 'My API',
    description: 'Description',
  },
  //host: 'localhost:8080',
  //schemes: ['http'],
  host: 'books-project2.onrender.com',
  schemes: ['https'],
};

const outputFile = './swagger.json';
const endpointsFiles = ['./routes/index.js'];

//swaggerAutogen(outputFile, endpointsFiles, doc);
// Run server after it gets generated
swaggerAutogen(outputFile, endpointsFiles, doc).then(async () => {
    await import('./app.js');
  });