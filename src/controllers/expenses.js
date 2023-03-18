'use strict';

const usersServices = require('../services/users');
const expensesService = require('../services/expenses');

const getAll = (req, res) => {
  const expenses = expensesService.getAll(req.query);

  res.send(expenses);
};

const getOne = (req, res) => {
  const expenseId = Number(req.params.expenseId);

  const foundExpense = expensesService.findById(expenseId);

  if (!foundExpense) {
    res.sendStatus(404);

    return;
  }

  res.send(foundExpense);
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

  const user = usersServices.findById(userId);

  const isBodyValid = user
    && typeof spentAt === 'string'
    && typeof title === 'string'
    && typeof amount === 'number'
    && typeof note === 'string'
    && typeof category === 'string';

  if (!isBodyValid) {
    res.sendStatus(400);

    return;
  }

  const newExpense = expensesService.create(req.body);

  res.statusCode = 201;
  res.send(newExpense);
};

const remove = (req, res) => {
  const expenseId = Number(req.params.expenseId);

  const foundExpense = expensesService.findById(expenseId);

  if (!foundExpense) {
    res.sendStatus(404);

    return;
  }

  expensesService.remove(expenseId);

  res.sendStatus(204);
};

const update = (req, res) => {
  const expenseId = Number(req.params.expenseId);
  const updateData = req.body;

  const foundExpense = expensesService.findById(expenseId);

  if (!foundExpense) {
    res.sendStatus(404);

    return;
  }

  const updatedEexpense = expensesService.update(expenseId, updateData);

  res.send(updatedEexpense);
};

module.exports = {
  getAll,
  getOne,
  create,
  remove,
  update,
};
