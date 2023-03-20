const {MongoClient} = require('mongodb');
const request = require('supertest');
const app = require('../src/routes/index');

describe('insert', () => {
  let connection;
  let db;

  beforeAll(async () => {
    connection = await MongoClient.connect(globalThis.__MONGO_URI__, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    db = await connection.db(globalThis.__MONGO_DB_NAME__);
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

  afterAll(async () => {
    await connection.close();
  });

  it('should insert a doc into collection', async () => {
    const movies = db.collection('movies');

    const mockUser = {_id: 'some-user-id', name: 'John'};
    await movies.insertOne(mockUser);

    const insertedUser = await movies.findOne({_id: 'some-user-id'});
    expect(insertedUser).toEqual(mockUser);
  });

  it("probando", async () => {
    const res = await request(app)
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

    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('post');
    expect(res.body.post).toHaveProperty('title', 'updated title');
    });
});