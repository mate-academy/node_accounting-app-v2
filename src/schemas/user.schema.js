const joi = require('joi');

const userSchema = joi.object({
  name: joi.string().min(2).required(),
});

module.exports = userSchema;
