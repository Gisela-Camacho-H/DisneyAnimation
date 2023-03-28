const mongodb = require('../db/connect');
const ObjectId = require('mongodb').ObjectId;

function getCollection() {
    return mongodb.getCollection('characters')
}

const getAllCharactersFromDB = async () => {
    let result = await getCollection().find();
    return result
};

const getSingle = async (req) => {
    let characterId = new ObjectId(req.params.id);
    let result = await getCollection().findOne({'_id': characterId});
    return result
};

const createOneCharacter = async (character) => {
    let response = await getCollection().insertOne(character);
    return response.acknowledged
};

const updateOneCharacter = async (updateOption) => {
    let response = await getCollection().replaceOne(updateOption.id, updateOption.character);
    return response
};

const deleteCharacter = async (characterId) => {

    const response = await getCollection().remove({'_id': characterId}, true);
    return response.deletedCount > 0
};

module.exports = {
    getAllCharactersFromDB,
    getSingle,
    createOneCharacter,
    updateOneCharacter,
    deleteCharacter
};