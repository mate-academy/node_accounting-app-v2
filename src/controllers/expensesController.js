'use strict';

const usersService = require('../services/usersService');
const expensesService = require('../services/expensesService');

const getAll = (req, res) => {
  const query = req.query;
  const expenses = expensesService.getAllExpenses(query);

  res.send(expenses);
};

const getOne = (req, res) => {
  const { expenseId } = req.params;
  const foundExpense = expensesService.getExpenseById(expenseId);

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
  const foundUser = usersService.getUserById(userId);

  if (!userId || !spentAt || !title || !amount
    || !category || !note || !foundUser) {
    res.sendStatus(400);

    return;
  }

  const newExpense = expensesService.createExpense(req.body);

  res.statusCode = 201;
  res.send(newExpense);
};

const remove = (req, res) => {
  const { expenseId } = req.params;
  const foundExpense = expensesService.getExpenseById(expenseId);

  if (!foundExpense) {
    res.sendStatus(404);

    return;
  }

  expensesService.removeExpense(expenseId);
  res.sendStatus(204);
};

const update = (req, res) => {
  const { expenseId } = req.params;
  const foundExpense = expensesService.getExpenseById(expenseId);

  if (!foundExpense) {
    res.sendStatus(404);

    return;
  }

  const requestBody = req.body;

  const updatedExpense = expensesService.updateExpense({
    expenseId,
    requestBody,
  });

  res.send(updatedExpense);
};

module.exports = {
  getAll,
  getOne,
  create,
  remove,
  update,
};
