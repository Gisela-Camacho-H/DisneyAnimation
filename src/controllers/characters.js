
const {getAllCharacters, getSingleCharacter,
    createCharacter, updateCharacter, deleteCharacter} = require("../services/characters");

const getAll = async (req, res, next) => {
    getAllCharacters(req, res);
};

const getSingle = async (req, res, next) => {
    getSingleCharacter(req, res);
};

const createCharacters = async (req, res) => {
    createCharacter(req, res);
};

const updateCharacters = async (req, res) => {
   updateCharacter(req, res);
};

const deleteCharacters = async (req, res) => {
    deleteCharacter(req, res);
};

module.exports = {
    getAll,
    getSingle,
    createCharacters,
    updateCharacters,
    deleteCharacters
};