const {getCollection} = require("../../src/db/connect");
const erasRepo = require("../../src/repositories/eras");
const {request} = require("express");

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
                message: () => (`expected ${this.utils.printReceived(received)} not to contain object ${this.utils.printExpected(argument)}`),
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

describe('GetAllEras', () => {
    afterAll(() => {
        jest.resetAllMocks()
    })
    it("This test is getting all the documents from collection", async () => {
        const returnAll = {
            find: jest.fn().mockResolvedValueOnce([
                {
                    "name":"Golden Age",
                    "start_year": "1937",
                    "end_year": "1942",
                    "description": "The Golden Age of Disney animation had films overseen directly by Walt himself. Despite its name, the Golden Age wasn't a very profitable time for the studio. A notable characteristic of this era is the dark themes present in its films.",
                    "moviesEra":"Snow White and the Seven Dwarves, Pinocchio, Fantasia, Dumbo, Bambi"
                },
                {
                    "name":"Package Era",
                    "start_year": "1943",
                    "end_year": "1949",
                    "description": "Also called the Wartime Era, this era of animation came about from the studio facing severe budget cuts and a smaller team of animators, due to the arrival of World War II. The films of this era are obscure and were not widely popular.",
                    "moviesEra":"Saludos Amigos, The Three Caballeros, Make Mine Music, Fun and Fancy Free, Melody Time, The Adventures of Icabod and Mr. Toad"
                }])
        }
        mGetCollection.mockReturnValueOnce(returnAll)
        let actual = await erasRepo
            .getAllErasFromDB()
            .then(list => list);
        expect(actual).toHaveLength(2)
        expect(actual).toContainObject({name: "Golden Age"})

    })
})