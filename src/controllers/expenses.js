'use strict';

const expenseService = require('../services/expenses');
const usersService = require('../services/users');

const getAll = (req, res) => {
  const {
    userId,
    categories,
    from,
    to,
  } = req.query;

  const visibleExpenses = expenseService.getAllExpenses(
    Number(userId),
    categories,
    from,
    to,
  );

  res.send(visibleExpenses);
};

const getOne = (req, res) => {
  const { expenseId } = req.params;
  const foundExpense = expenseService.getExpenseById(
    Number(expenseId)
  );

  if (!foundExpense) {
    res.sendStatus(404);

    return;
  }

  res.send(foundExpense);
};

const create = (req, res) => {
  const {
    userId,
    title,
    spentAt,
  } = req.body;

  const id = Number(userId);

  const foundUser = usersService.getUserById(id);

  if (!userId || !foundUser || !title || !spentAt) {
    res.sendStatus(400);

    return;
  }

  const newExpense = expenseService.createExpense(req.body);

  res.statusCode = 201;
  res.send(newExpense);
};

const remove = (req, res) => {
  const { expenseId } = req.params;
  const id = Number(expenseId);
  const foundExpense = expenseService.getExpenseById(id);

  if (!foundExpense) {
    res.sendStatus(404);

    return;
  }

  expenseService.removeExpense(id);
  res.sendStatus(204);
};

const update = (req, res) => {
  const expense = req.body;
  const { expenseId } = req.params;
  const id = Number(expenseId);
  const foundExpense = expenseService.getExpenseById(id);

  if (!foundExpense) {
    res.sendStatus(404);

    return;
  }

  const updatedExpense = expenseService.updateExpense(id, expense);

  res.send(updatedExpense);
};

module.exports = {
  getAll,
  getOne,
  create,
  remove,
  update,
};
