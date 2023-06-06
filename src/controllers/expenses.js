'use strict';

const userService = require('../services/users');
const expensesService = require('../services/expenses');

const getAllExpenses = (req, res) => {
  const { userId, categories, from, to } = req.query;
  let expenses = expensesService.getAllExpenses();

  if (userId) {
    expenses = expenses.filter((elem) => elem.userId === +userId);
  }

  if (categories) {
    expenses = expenses.filter((elem) => elem.category === categories);
  }

  if (from && to) {
    expenses = expenses.filter(({ spentAt }) => {
      const expanseDate = new Date(spentAt);
      const fromDate = new Date(from);
      const toDate = new Date(to);

      return fromDate <= expanseDate && toDate > expanseDate;
    });
  }

  res.send(expenses);
};

const getOneExpense = (req, res) => {
  const { expensesId } = req.params;
  const regex = /^\d+$/;

  if (!regex.test(expensesId)) {
    res.sendStatus(400);

    return;
  }

  const expense = expensesService.findExpensesById(expensesId);

  if (!expense) {
    res.sendStatus(404);

    return;
  }

  res.send(expense);
};

const addExpense = (req, res) => {
  const data = req.body;
  const userExpense = userService.findUserById(data.userId);

  if (!Object.entries(data).length || !userExpense) {
    res.sendStatus(400);

    return;
  }

  const newExpense = expensesService.createExpense(data);

  res.statusCode = 201;
  res.send(newExpense);
};

const updateExpense = (req, res) => {
  const { expensesId } = req.params;
  const body = req.body;
  const regex = /^\d+$/;

  if (!regex.test(expensesId)) {
    res.sendStatus(400);

    return;
  }

  const expense = expensesService.updateExpense(expensesId, body);

  if (!expense) {
    res.sendStatus(404);

    return;
  }

  res.statusCode = 200;
  res.send(expense);
};

const deleteExpense = (req, res) => {
  const { expensesId } = req.params;
  const regex = /^\d+$/;

  if (!regex.test(expensesId)) {
    res.sendStatus(400);

    return;
  }

  const foundExpense = expensesService.findExpensesById(expensesId);

  if (!foundExpense) {
    res.sendStatus(404);

    return;
  }

  expensesService.deleteExpense(expensesId);
  res.sendStatus(204);
};

module.exports = {
  getAllExpenses,
  getOneExpense,
  addExpense,
  updateExpense,
  deleteExpense,
};
