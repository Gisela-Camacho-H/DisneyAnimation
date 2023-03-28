const mongodb = require('../db/connect');
const ObjectId = require('mongodb').ObjectId;

function getCollection() {
  return mongodb.getCollection('eras')
}

const getAllErasFromDB = async () => {
  let result = await getCollection().find();
  return result
};

const getSingle = async (req) => {
  let eraId = new ObjectId(req.params.id);
  let result = await getCollection().findOne({'_id': eraId});
  return result
};

const createEras = async (era) => {
  let response = await getCollection().insertOne(era);
  return response.acknowledged
};

const updateEras = async (updateOption) => {
  let response = await getCollection().replaceOne(updateOption.id, updateOption.era);
  return response
};

const deleteEras = async (eraId) => {

  const response = await getCollection().remove({'_id': eraId}, true);
  return response.deletedCount > 0
};

module.exports = {
  getCollection,
  getAllErasFromDB,
  getSingle,
  createEras,
  updateEras,
  deleteEras
};





// const getAllEras = async (req, res, next) => {
//     const result = await mongodb.getDb().db().collection('eras').find();
//     result.toArray().then((lists) => {
//     res.setHeader('Content-Type', 'application/json');
//     res.status(200).json(lists);
//     });
// };

// const getSingleEra = async (req, res) => {
//     if (!ObjectId.isValid(req.params.id)) {
//       res.status(400).json('Must use a valid era id');
//     }
//       const eraId = new ObjectId(req.params.id);
//       const result = await mongodb
//       .getDb()
//       .db()
//       .collection('eras')
//       .find({ _id: eraId });
//       result.toArray().then((lists) => {
//       res.setHeader('Content-Type', 'application/json');
//       res.status(200).json(lists[0]);
//   });
//   };
  
//   const createEras = async (req, res) => {
//       const era = {
//         name: req.body.name,
//         start_year: req.body.start_year,
//         end_year: req.body.end_year,
//         description: req.body.description,
//         moviesInEra: req.body.moviesInEra
//       };
//       const response = await mongodb.getDb().db().collection('eras').insertOne(era);
//       if (response.acknowledged) {
//         res.status(201).json(response);
//       } else {
//         res.status(500).json(response.error || 'Some error occurred while creating the era.');
//       }
//     };
    
//     const updateEras = async (req, res) => {
//       if (!ObjectId.isValid(req.params.id)) {
//         res.status(400).json('Must use a valid era id to update a era');
//       }
//       const eraId = new ObjectId(req.params.id);
//       const era = {
//         name: req.body.name,
//         start_year: req.body.start_year,
//         end_year: req.body.end_year,
//         description: req.body.description,
//         moviesInEra: req.body.moviesInEra
//       };
//       const response = await mongodb
//         .getDb()
//         .db()
//         .collection('eras')
//         .replaceOne({ _id: eraId }, era);
//       console.log(response);
//       if (response.modifiedCount > 0) {
//         res.status(204).send();
//       } else {
//         res.status(500).json(response.error || 'Some error occurred while updating the era.');
//       }
//     };
    
//     const deleteEras = async (req, res) => {
//       if (!ObjectId.isValid(req.params.id)) {
//         res.status(400).json('Must use a valid movie id to delete a era');
//       }
//       const eraId = new ObjectId(req.params.id);
//       const response = await mongodb.getDb().db().collection('eras').remove({ _id: eraId }, true);
//       console.log(response);
//       if (response.deletedCount > 0) {
//         res.status(204).send();
//       } else {
//         res.status(500).json(response.error || 'Some error occurred while deleting the era.');
//       }
//     };

// module.exports = {
//     getAllEras,
//     getSingleEra,
//     createEras,
//     updateEras,
//     deleteEras
// }