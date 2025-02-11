const expenseService = require('../services/expense.service');
const userService = require('../services/user.service');

const getAll = (req, res) => {
  res.json(expenseService.getAll(req.query));
};

const getOne = (req, res) => {
  const { id } = req.params;

  if (!id) {
    return res.sendStatus(400);
  }

  const expense = expenseService.getById(id);

  if (!expense) {
    return res.sendStatus(404);
  }

  res.json(expense);
};

const update = (req, res) => {
  const { id } = req.params;
  const { amount } = req.body;

  if (!id) {
    return res.sendStatus(400);
  }

  if (!expenseService.getById(id)) {
    return res.sendStatus(404);
  }

  if (amount && amount < 0) {
    return res.sendStatus(400);
  }

  const validFields = {};

  for (const key of Object.keys(req.body)) {
    if (expenseService.reqFields.includes(key)) {
      validFields[key] = req.body[key];
    }
  }

  res.json(expenseService.update(id, validFields));
};

const remove = (req, res) => {
  const { id } = req.params;

  if (!expenseService.getById(id)) {
    return res.sendStatus(404);
  }

  expenseService.remove(id);
  res.sendStatus(204);
};

const create = (req, res) => {
  const { userId, spentAt, title, amount, category } = req.body;
  const newExpense = {};

  if (
    !userService.getById(userId) ||
    !spentAt ||
    !title ||
    !amount ||
    amount < 0 ||
    !category
  ) {
    return res.sendStatus(400);
  }

  for (const key of Object.keys(req.body)) {
    if (expenseService.reqFields.includes(key)) {
      newExpense[key] = req.body[key];
    }
  }

  res.status(201).json(expenseService.create(newExpense));
};

module.exports = {
  getAll,
  getOne,
  update,
  remove,
  create,
};
