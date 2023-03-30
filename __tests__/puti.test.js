const request = require('supertest');
const {MongoClient} = require('mongodb');
const { MongoMemoryServer } = require('mongodb-memory-server');

const app = require('../src/app');
require('dotenv').config();

describe('updateMovies function', () => {
  // Crea una instancia de MongoMemoryServer para usar una base de datos de prueba
  let mongoServer;
  let connection;
  let db;

  beforeAll(async () => {
    mongoServer = await MongoMemoryServer.create();
    const uri = mongoServer.getUri();
    connection = await MongoClient.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    db = await connection.db('test');
  });

  afterAll(async () => {
    await connection.close();
    await mongoServer.stop();
  });

  it('Debería actualizar un recurso existente', async () => {
    const movies = db.collection('movies');
    //console.log(movies);
    // Primero, inserta un recurso en la base de datos que podremos actualizar
    /*const mockMovie = {
        title: 'viejo Title',
        promoImage: 'Old Movie Image',
        year: '2021',
        era: 'Contemporary',
        length: '120',
        trailerLink: 'Old Movie Trailer',
        trivia: 'Old Movie Trivia',
        category: 'Old Movie Category',
    };
    const insertResult = await movies.insertOne(mockMovie);
    console.log(insertResult);*/

    // Luego, intenta actualizar el recurso que acabamos de insertar
    const mockMovieUpdate = {
        title: 'nuevo del viejo titulo',
        promoImage: 'Otra cosa',
        year: '2023',
        era: 'Otra Contemporary',
        length: '120',
        trailerLink: 'Old Movie Trailer',
        trivia: 'Old Movie Trivia',
        category: 'Old Movie Category',
    };
    const response = await request(app);
      //.put(`/movies/${insertResult.insertedId}`)
      //.put(`/movies/64255e35c81876e41e0f11ff`)
      //.send(mockMovieUpdate);
console.log(response);
    /************
     * TEST     *
     ************/
    // Comprueba que la respuesta HTTP tenga el código de estado correcto
    //expect(response.status).toEqual(200);


  });

});