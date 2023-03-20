const request = require('supertest');
//const app = require('../src/app');
const { MongoMemoryServer } = require('mongodb-memory-server');
const { MongoClient } = require('mongodb');
const { updateMovies } = require('../src/routes/index');
require('dotenv').config();

describe('PUT /movies/:id', () => {
  let mongoServer;
  let db, client;
  let movieId;

  beforeAll(async () => {
    mongoServer = new MongoMemoryServer();
    client = await MongoClient.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    db = await client.db(globalThis.__MONGO_DB_NAME__);
  });

  afterAll(async () => {
    await client.close();
    await mongoServer.stop();
  });


  beforeEach(async () => {
    const movies = db.collection('movies');
    const movie = {
      title: 'Old Movie Title',
      promoImage: 'Old Movie Image',
      year: '2021',
      era: 'Contemporary',
      length: '120',
      trailerLink: 'Old Movie Trailer',
      trivia: 'Old Movie Trivia',
      category: 'Old Movie Category',
    };
    const result = await movies.insertOne(movie);
    movieId = result.insertedId.toString();

    res = {
        status: jest.fn().mockReturnThis(),
        send: jest.fn(),
        json: jest.fn(),
      };
  });

  afterEach(async () => {
    await db.collection('movies').deleteMany({});
  });

  it('should update a movie in the database', async () => {
    const res = await 
        request('http://localhost:8080')
        .put(`/movies/${movieId}`)
        .send({
            title: 'New Movie Title',
            promoImage: 'New Movie Image',
            year: '2023',
            era: 'Modern',
            length: '120',
            trailerLink: 'New Movie Trailer',
            trivia: 'New Movie Trivia',
            category: 'New Movie Category',
        });
    expect(res.status).toBe(204);
    });

    

  test("examinando mi put (link)", () => {
    // actual test
    console.log(res);
    //fin del test
  });

});
