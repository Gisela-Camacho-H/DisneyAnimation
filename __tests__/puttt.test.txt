//const {initDb, getDb} = require("../src/db/connect");
const { MongoClient } = require('mongodb');
const dotenv = require('dotenv');
dotenv.config();

//https://youtu.be/xJzeYvelDqo?list=PLs4YDKCLLrp-44HNv4j-Efw6WZITMzxo1&t=1386

describe("llamada a conectarse a la base de datos", ()=>{
    let connection;
    let db;

    beforeAll(async () => {

        connection = await MongoClient.connect(process.env.MONGODB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        db = await connection.db('movies')
    });

    afterAll(async() => {
        await connection.close()
    });

    it('should insert a doc into collection', async () => {
        const movies = db.collection('movies');
        const mockUser = {
            _id: 'some-user-id',
            title: 'Old Movie Title',
            promoImage: 'Old Movie Image',
            year: '2021',
            era: 'Contemporary',
            length: '120',
            trailerLink: 'Old Movie Trailer',
            trivia: 'Old Movie Trivia',
            category: 'Old Movie Category',
        };
        await movies.insertOne(mockUser);
        const insertedUser = await movies.findOne({ _id: 'some-user-id' });
        expect(insertedUser).toEqual(mockUser);
    });

    it('se actualiza en la base de datos PUT', async () => {
        const movies = db.collection('movies');
        //movieId = insertedMovie.insertedId.toString();
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
        //const updateMovie = await movies.replaceOne({ _id: 'some-user-id' },mockMovieUpdate);
        //expect(updateMovie.result.modifiedCount).toEqual(1);

        // Busca el documento antes de actualizarlo
  const movieToUpdate = await movies.findOne({ _id: 'some-user-id' });
  // Verifica que el documento existe antes de intentar actualizarlo
  if (movieToUpdate) {
    const updateMovie = await movies.replaceOne(movieToUpdate, mockMovieUpdate, { upsert: false });
    // Verifica que el documento se actualizó correctamente
    //expect(updateMovie.result.matchedCount).toEqual(1);
    expect(updateMovie).toEqual(mockMovieUpdate);
  } else {
    throw new Error('El documento no existe en la base de datos');
  }
});

});