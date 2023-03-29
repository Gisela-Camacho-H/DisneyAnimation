const {getCollection} = require("../../src/db/connect");
const spinoffRepo = require("../../src/repositories/spinoff");
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

describe('GetAllSpinoffs', () => {
    afterAll(() => {
        jest.resetAllMocks()
    })
    it("This test is getting all the documents from collection", async () => {
        const returnAll = {
            find: jest.fn().mockResolvedValueOnce([
                {
                    "title": "Aladdin 2: The Return of Jafar",
                    "related": "Aladdin",
                    "type": "Sequel"
                },
                {
                    "title": "Aladdin and the King of Thieves",
                    "related": "Aladdin",
                    "type": "Sequel"
                }])
        }
        mGetCollection.mockReturnValueOnce(returnAll)
        let actual = await spinoffRepo
            .getAllSpinoffsFromDB()
            .then(list => list);
        expect(actual).toHaveLength(2)
        expect(actual).toContainObject({title: "Aladdin 2: The Return of Jafar"})

    })
})