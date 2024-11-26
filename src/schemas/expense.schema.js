const joi = require('joi');

const expenseSchema = joi.object({
  userId: joi.number().required(),
  spentAt: joi.date().iso().required(),
  title: joi.string().required(),
  amount: joi.number().required(),
  category: joi.string().required(),
  note: joi.string().required(),
});

module.exports = expenseSchema;
