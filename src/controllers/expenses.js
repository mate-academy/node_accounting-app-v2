'use strict';

const {
  getByUserId,
} = require('../services/users');

const {
  getAllExpenses,
  getByExpenseId,
  createNewExpense,
  removeExpense,
  updateExpense,
} = require('../services/expenses.js');

const getAll = (req, res) => {
  const expenses = getAllExpenses();

  const { userId, category, to, from } = req.query;

  if (from && to) {
    const foundExpensesByDate = expenses.filter(expense =>
      expense.spentAt >= from && expense.spentAt <= to);

    res.send(foundExpensesByDate);
    res.statusCode = 200;

    return;
  }

  if (category) {
    const foundExpensesByCategory = expenses.filter(expense =>
      expense.category === category);

    res.send(foundExpensesByCategory);
    res.statusCode = 200;

    return;
  }

  if (userId) {
    const foundExpensesByUserId = expenses.filter(
      (expense) => expense.userId === +userId
    );

    res.send(foundExpensesByUserId);
    res.statusCode = 200;

    return;
  }

  res.statusCode = 200;
  res.send(expenses);
};

const getOne = (req, res) => {
  const { expenseId } = req.params;
  const foundExpense = getByExpenseId(expenseId);

  if (!foundExpense) {
    res.sendStatus(404);

    return;
  }

  res.send(foundExpense);
};

const add = (req, res) => {
  const { userId, title } = req.body;
  const expenseData = req.body;

  const foundUser = getByUserId(userId);

  if (!title || !foundUser) {
    res.sendStatus(400);

    return;
  }

  const newExpense = createNewExpense(expenseData);

  res.statusCode = 201;
  res.send(newExpense);
};

const remove = (req, res) => {
  const { expenseId } = req.params;
  const foundExpense = getByExpenseId(expenseId);

  if (!foundExpense) {
    res.sendStatus(404);

    return;
  }

  removeExpense(expenseId);
  res.sendStatus(204);
};

const update = (req, res) => {
  const { expenseId } = req.params;
  const foundExpense = getByExpenseId(expenseId);

  if (!foundExpense) {
    res.sendStatus(404);

    return;
  }

  updateExpense(foundExpense, req.body);

  res.send(foundExpense);
};

module.exports = {
  getAll,
  getOne,
  add,
  remove,
  update,
};
