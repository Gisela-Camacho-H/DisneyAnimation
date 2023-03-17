const app = require('../src/app')
const supertest = require('supertest');
const { expect } = require('@jest/globals');
const request = supertest(app)


describe('Test Handlers', () => {
    test('responds to post /movies', async () => {
        const res = await request.post('/movies').send(    {
            title: "movie",
            promoImage: "movie",
            year: 1222,
            era: "movie",
            length: "movie",
            trailerLink: "movie",
            trivia: "movie",
            category: "movie"
        });
        expect(res.header['content-type']).toBe('application/json; charset=utf-8');
        expect(res.statusCode).toBe(201)
    })

    
})