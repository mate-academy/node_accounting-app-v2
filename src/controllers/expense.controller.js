'use strict';

const expensesServices = require('../services/expense.service');
const userService = require('../services/user.service');
const filterExpenses = require('../helpers/filterExpenses');
const { validate } = require('../helpers/userValidation');

const getAll = (req, res) => {
  const allExpenses = expensesServices.findAll();
  const { userId, categories, from, to } = req.query;
  const filters = {
    userId,
    categories,
    from,
    to,
  };
  const filteredExpenses = filterExpenses(allExpenses, filters);

  return res.send(filteredExpenses);
};

const getById = (req, res) => {
  const { id } = req.params;

  const expenses = expensesServices.getById(+id);

  if (!expenses) {
    res.sendStatus(404);

    return;
  }

  return res.json(expenses);
};

const create = (req, res) => {
  const {
    userId,
    spentAt,
    title,
    amount,
    category,
    note,
  } = req.body;

  const findUser = userService.getById(userId);

  if (!validate(title) || !findUser) {
    res.sendStatus(400);

    return;
  }

  const newExpenses = expensesServices.create({
    userId,
    spentAt,
    title,
    amount,
    category,
    note,
  });

  res.status(201).send(newExpenses);
};

const remove = (req, res) => {
  const { id } = req.params;

  if (!expensesServices.getById(+id)) {
    return res.sendStatus(404);
  }

  expensesServices.remove(+id);

  return res.sendStatus(204);
};

const update = (req, res) => {
  const { id } = req.params;
  const { title } = req.body;

  const expenses = expensesServices.getById(+id);

  if (!expenses || !validate(title)) {
    res.sendStatus(404);

    return;
  }

  const updatedExpenses = expensesServices.update(title, expenses);

  return res.send(updatedExpenses);
};

module.exports = {
  getAll,
  getById,
  create,
  remove,
  update,
};
