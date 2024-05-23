const statusCodes = require('./../utils/statusCodes');
const expenseService = require('./../services/expense.service');
const userService = require('./../services/user.service');

const getAll = (req, res) => {
  const expenses = expenseService.getAll(req.query);

  res.status(statusCodes['OK']).send(expenses);
};

const getOne = (req, res) => {
  const { id } = req.params;

  const expense = expenseService.getById(id);

  if (!expense) {
    res.sendStatus(statusCodes['NOT_FOUND']);

    return;
  }

  res.status(statusCodes['OK']).send(expense);
};

const create = (req, res) => {
  const expenseData = req.body;

  if (!expenseData.title || !userService.getById(expenseData.userId)) {
    res.sendStatus(statusCodes['BAD_REQUEST']);

    return;
  }

  const newExpense = expenseService.create(expenseData);

  res.status(statusCodes['CREATED']).send(newExpense);
};

const update = (req, res) => {
  const { id } = req.params;

  const expense = expenseService.getById(id);

  if (!expense) {
    res.sendStatus(statusCodes['NOT_FOUND']);

    return;
  }

  const newExpense = expenseService.update(expense, req.body);

  res.status(statusCodes['OK']).send(newExpense);
};

const remove = (req, res) => {
  const { id } = req.params;

  if (!expenseService.getById(id)) {
    res.sendStatus(statusCodes['NOT_FOUND']);

    return;
  }

  expenseService.remove(id);
  res.sendStatus(statusCodes['NO_CONTENT']);
};

module.exports = {
  getAll,
  getOne,
  create,
  update,
  remove,
};
