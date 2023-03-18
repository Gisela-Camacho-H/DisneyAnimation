const {getCollection} = require("../../src/db/connect");
const characterRepo = require("../../src/repositories/characters");
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

describe('GetAllCharacters', () => {
    afterAll(() => {
        jest.resetAllMocks()
    })
    it("This test is getting all the documents from collection", async () => {
        const returnAll = {
            find: jest.fn().mockResolvedValueOnce([
                {
                    "name": "Snow White",
                    "role": "Protagonist",
                    "description": "A 14 year old girl and the stepdaughter of the Evil Queen. She seems to have a sweet and caring personality, but she has a sassy side that is often overlooked.",
                    "trivia": "Snow White is the third animated character to have a star on the Hollywood Walk of Fame, and is the only Disney Princess to have one."
                },
                {
                    "name": "Evil Queen",
                    "role": "Antagonist",
                    "description": "Considered one of the most iconic Disney villains. She is ruthless, jealous, and extremely vain. Upon her transformation into an old witch, she becomes more maniacal.",
                    "trivia": "Early promotional material gave her the name Queen Grimhilde."
                }])
        }
        mGetCollection.mockReturnValueOnce(returnAll)
        let actual = await characterRepo
            .getAllCharactersFromDB()
            .then(list => list);
        expect(actual).toHaveLength(2)
        expect(actual).toContainObject({name: "Snow White"})

    })
})