'use strict';

const validateRequest = (schema, location) => (req, res, next) => {
  const reqData = location === 'body' ? req.body : req.query;

  const { error } = schema.validate(reqData);

  if (error) {
    res.status(400).send('Bad request');

    return;
  }

  next();
};

const reqBodyValidation = (schema) => validateRequest(schema, 'body');
const reqQueryValidation = (schema) => validateRequest(schema, 'query');

module.exports = {
  reqBodyValidation,
  reqQueryValidation,
};
