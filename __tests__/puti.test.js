const request = require('supertest');
const mongoose = require('mongoose');
const MongoMemoryServer = require('mongodb-memory-server').MongoMemoryServer;
const dotenv = require('dotenv');
dotenv.config();

// Crea una instancia de MongoMemoryServer para usar una base de datos de prueba
const mongod = new MongoMemoryServer();

let app;

beforeAll(async () => {
  // Configura la base de datos de prueba y la conexión con Mongoose
  //const uri = await mongod.getUri();
  //const uri = await mongod.connect(process.env.MONGODB_URI);
  await mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true });

  // Carga la aplicación para poder realizar pruebas HTTP
  app = require('../src/app');
});

afterAll(async () => {
  // Cierra la conexión de Mongoose y detiene la base de datos de prueba
  await mongoose.disconnect();
  await mongod.stop();
});

describe('Ejemplo de prueba para un PUT', () => {
  it('Debería actualizar un recurso existente', async () => {
    // Primero, inserta un recurso en la base de datos que podremos actualizar
    const mockMovie = {
        title: 'Old Movie Title',
        promoImage: 'Old Movie Image',
        year: '2021',
        era: 'Contemporary',
        length: '120',
        trailerLink: 'Old Movie Trailer',
        trivia: 'Old Movie Trivia',
        category: 'Old Movie Category',
    };
    const insertResult = await mongoose.connection.collection('movies').insertOne(mockMovie);

    // Luego, intenta actualizar el recurso que acabamos de insertar
    const mockMovieUpdate = {
        title: 'Otro titulo',
        promoImage: 'Otra cosa',
        year: '2023',
        era: 'Otra Contemporary',
        length: '120',
        trailerLink: 'Old Movie Trailer',
        trivia: 'Old Movie Trivia',
        category: 'Old Movie Category',
    };
    const response = await request(app)
      .put(`/movies/${insertResult.insertedId}`)
      .send(mockMovieUpdate);

    // Comprueba que la respuesta HTTP tenga el código de estado correcto
    expect(response.status).toEqual(200);

    // Por último, comprueba que el recurso se haya actualizado correctamente en la base de datos
    const updatedDocument = await mongoose.connection.collection('movies').findOne({_id: insertResult.insertedId});
    expect(updatedDocument.name).toEqual(updatedResource.name);
    expect(updatedDocument.description).toEqual(updatedResource.description);
  });
});
