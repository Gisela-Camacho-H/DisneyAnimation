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
            id: 'some-user-id',
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
        const insertedUser = await movies.findOne({ id: 'some-user-id' });
        expect(insertedUser).toEqual(mockUser);
    });
}
);