const validator = require('../helpers/validator');

const saveMovie = (req, res, next) => {
    const validationRule = {
  
      title: 'required|string',
      promoImage: 'required|string',
      year: 'required|integer',
      era: 'required|string',
      length: 'required|string',
      trailerLink: 'required|string',
      trivia: 'required|string',
      category: 'required|string'
    };
    validator(req.body, validationRule, {}, (err, status) => {
      if (!status) {
        res.status(412).send({
          success: false,
          message: 'Validation failed',
          data: err
        });
      } else {
        next();
      }
    });
  };

  const saveCharacter = (req, res, next) => {
    const validationRule = {
      name: 'required|string',
      role: 'required|string',
      description: 'required|string',
      trivia: 'required|string'
    };
    validator(req.body, validationRule, {}, (err, status) => {
      if (!status) {
        res.status(412).send({
          success: false,
          message: 'Validation failed',
          data: err
        });
      } else {
        next();
      }
    });
  };

  const saveEra = (req, res, next) => {
    const validationRule = {
      name: 'required|string',
      start_year: 'required|string',
      end_year: 'required|string',
      description: 'required|string',
      moviesInEra: 'required|string'
    };
    validator(req.body, validationRule, {}, (err, status) => {
      if (!status) {
        res.status(412).send({
          success: false,
          message: "Validation failed",
          data: err
        });
      } else {
        next();
      }
    });
  };

module.exports = {
  saveMovie,
  saveCharacter,
  saveEra
};
