//JEST y SUPERTEST
const request = require('supertest');

//MONGO CONECT
//const ObjectId = require('mongodb').ObjectId;
const mongodb = require('../src/db/connect');
const {MongoClient,ObjectId} = require('mongodb');
const { MongoMemoryServer } = require('mongodb-memory-server');

//app
const app = require('../src/app');

//las conntraseñas guardadas
require('dotenv').config();
 
// Crea una instancia de MongoMemoryServer para usar una base de datos de prueba
 let mongoServer;
 let connection;
 let _db;
 let responce;
 let server;

describe('updateMovies function', () => {
  //antes de cada prueba empezar la base de datos
  beforeAll(async()=>{
    _db = await MongoClient.connect(process.env.MONGODB_URI);
    
    server = app.listen(8080);
  });

  beforeEach(async ()=>{
    responce = await request(app).get('/movies').send();
  });

  afterAll(async () => {
    await _db.close();
    server.close();
  });

  it("la ruta funciona", async () => {
    await expect(responce.status).toBe(200);
    //await expect(responce.headers['Content-Type']).toContain('json');
    //expect(responce.body).toBeInstanceOf(Array);
  });
});