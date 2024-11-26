const { expensesService, usersService } = require('./../services');
const { expenseSchema } = require('./../schemas');
const joi = require('joi');

const getAll = (req, res) => {
  const { userId, categories, from, to } = req.query;
  const expenses = expensesService.getAll({
    userId: +userId,
    categories,
    from,
    to,
  });

  res.json(expenses);
};

const getOne = (req, res) => {
  const { id } = req.params;

  const expense = expensesService.getById(+id);

  if (!expense) {
    res.sendStatus(404);

    return;
  }

  res.json(expense);
};

const create = (req, res) => {
  const { error, value } = expenseSchema.validate(req.body, {
    stripUnknown: true,
  });

  if (error) {
    res.sendStatus(400);

    return;
  }

  const isUserExist = !!usersService.getById(value.userId);

  if (!isUserExist) {
    res.sendStatus(400);

    return;
  }

  const newExpense = expensesService.create(value);

  res.status(201).json(newExpense);
};

const removeOne = (req, res) => {
  const { id } = req.params;

  const isExist = !!expensesService.getById(+id);

  if (!isExist) {
    res.sendStatus(404);

    return;
  }

  expensesService.deleteOne(+id);
  res.sendStatus(204);
};

const update = (req, res) => {
  const { id } = req.params;

  const isExist = !!expensesService.getById(+id);

  if (!isExist) {
    res.sendStatus(404);

    return;
  }

  const keys = Object.keys(req.body);

  if (keys.length === 0) {
    res.sendStatus(400);

    return;
  }

  const dynamicSchema = joi.object(
    keys.reduce((schema, key) => {
      if (expenseSchema.describe().keys[key]) {
        schema[key] = expenseSchema.extract(key);
      }

      return schema;
    }, {}),
  );

  const { error, value } = dynamicSchema.validate(req.body, {
    stripUnknown: true,
  });

  if (error) {
    res.sendStatus(400);

    return;
  }

  const updatedExpense = expensesService.update(+id, value);

  res.json(updatedExpense);
};

module.exports = {
  getAll,
  getOne,
  create,
  update,
  removeOne,
};
