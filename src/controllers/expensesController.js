'use strict';

const expenseService = require('../services/expensesService.js');
const userService = require('../services/usersService.js');

function getAllExpenses(req, res) {
  const { userId, category, from, to } = req.query;
  const expenses = expenseService.getAll();

  const foundUser = userService.getById(+userId);

  if (!expenses) {
    res.send([]);

    return;
  }

  if (foundUser) {
    let userExpenses = expenses.filter(expense => expense.userId === +userId);

    if (category) {
      userExpenses = userExpenses
        .filter(expense => expense.category === category);
    }
    res.send(userExpenses);

    return;
  }

  if (from && to) {
    const expensesByDate = expenses.filter(
      expense => (expense.spentAt >= from && expense.spentAt <= to)
    );

    res.send(expensesByDate);

    return;
  }

  res.statusCode = 200;
  res.send(expenses);
};

function getExpense(req, res) {
  const { expenseId } = req.params;
  const foundExpense = expenseService.getById(+expenseId);

  if (!foundExpense) {
    res.sendStatus(404);

    return;
  }

  res.statusCode = 200;
  res.send(foundExpense);
};

function addExpense(req, res) {
  const { userId } = req.body;

  const foundUser = userService.getById(+userId);

  if (!foundUser) {
    res.sendStatus(400);

    return;
  };

  const id = new Date() * Math.random();

  const newExpense = {
    ...req.body,
    id,
  };

  expenseService.add(newExpense);

  res.statusCode = 201;
  res.send(newExpense);
};

function deleteExpense(req, res) {
  const { expenseId } = req.params;

  const foundExpense = expenseService.getById(+expenseId);

  if (!foundExpense) {
    res.sendStatus(404);

    return;
  }

  expenseService.remove(+expenseId);
  res.sendStatus(204);
};

function updateExpense(req, res) {
  const { expenseId } = req.params;
  const { title } = req.body;

  const foundExpense = expenseService.getById(+expenseId);

  if (!foundExpense) {
    res.sendStatus(404);

    return;
  }

  expenseService.update(foundExpense, { title });

  res.statusCode = 200;
  res.send(foundExpense);
};

module.exports = {
  getAllExpenses,
  getExpense,
  addExpense,
  deleteExpense,
  updateExpense,
};
