//JEST
const request = require('supertest');
const {MongoClient} = require('mongodb');
const { MongoMemoryServer } = require('mongodb-memory-server');

//MONGO CONECT
const ObjectId = require('mongodb').ObjectId;
const mongodb = require('../src/db/connect');

//app
const app = require('../src/app');

//las conntraseñas guardadas
require('dotenv').config();
 
// Crea una instancia de MongoMemoryServer para usar una base de datos de prueba
 let mongoServer;
 let connection;
 let _db;
 let responce;

describe('updateMovies function', () => {
  //antes de cada prueba empezar la base de datos
  beforeAll(async()=>{
    mongodb.initDb((err) => {
      if (err) {
        console.log(err);
      }
    });
  });

  beforeEach(async ()=>{
    responce = await request(app).get('/movies').send();
  });

  it("la ruta funciona", async () => {
    await expect(responce.status).toBe(200);
    await expect(responce.headers['Content-Type']).toContain('json');
    //expect(responce.body).toBeInstanceOf(Array);
  });
});