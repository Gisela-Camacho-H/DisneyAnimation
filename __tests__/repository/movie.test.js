const {getCollection} = require('../../src/db/connect');
const movieRepo = require('../../src/repositories/movies');
const {request} = require('express');

jest.mock('../../src/db/connect')
const mGetCollection = jest.mocked(getCollection);

expect.extend({
    toContainObject(received, argument) {
        const pass = this.equals(received,
            expect.arrayContaining([
                expect.objectContaining(argument)
            ])
        )
        if (pass) {
            return {
                message: () => (`expected ${this.utils.printRecieved(recieved)} not to contain object ${this.utils.printExpected(argument)}`),
                pass: true
            }
        } else {
            return {
                message: () => (`expected ${this.utils.printReceived(received)} to contain object ${this.utils.printExpected(argument)}`),
                pass: false
            }
        }
    }
})

describe('GetAllMovies', () => {
    afterAll(() => {
        jest.resetAllMocks()
    })
    it('Gets all documents in the movies collection', async () => {
        const returnAll = {
            find: jest.fn().mockResolvedValueOnce([
                {
                    "title": "The Three Caballeros",
                    "promoImage": "https://static.wikia.nocookie.net/disney/images/7/7b/Three_caballeros_poster.png",
                    "year": "1945",
                    "era": "Package Era",
                    "length": "72 minutes",
                    "trailerLink": "https://youtu.be/6rbnP5cVZ4w",
                    "trivia": "The Three Caballeros is one of the package films released by Disney and features Donald Duck.",
                    "category": "Hybrid anthology"
                },
                {
                    "title": "Melody Time",
                    "promoImage": "https://static.wikia.nocookie.net/disney/images/2/2c/MelodyTimePosterHD.jpg",
                    "year": "1948",
                    "era": "Package Era",
                    "length": "75 minutes",
                    "trailerLink": "https://youtu.be/BjgrjB_8vdg",
                    "trivia": "Melody Time is the fifth package film. It is set to more popular music and is considered the 'contemporary' version of Fantasia.",
                    "category": "Hybrid musical"
                }
            ])
        }
        mGetCollection.mockReturnValueOnce(returnAll)
        let actual = await movieRepo
            .getallMoviesFromDB()
            .then(lists => lists)
        expect(actual).toHaveLength(2);
        expect(actual).toContainObject({title: 'Melody Time'})
    })
})