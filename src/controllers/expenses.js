'use strict';
/*eslint-disable*/
const { generateId } = require('../utils/idWrapper');
const { users } = require('./users');

const defaultExpense = {
  'userId': 0,
  'spentAt': '2023-08-21T17:44:48.537Z',
  'title': 'string',
  'amount': 0,
  'category': 'string',
  'note': 'string',
};
const expenses = [];

const getExpenseById = (req, res) => {
  const { expenseId } = req.params;
  const expense = expenses.find(el => el.id === +expenseId);

  if (expense) {
    res.statusCode = 200;
    res.send(expense);
  } else {
    res.statusCode = 404;
    res.send('Expense not found');
  }
};

const getAllExpenses = (req, res) => {
  const {
    from,
    to,
    userId,
    categories,
  } = req.query;

  let newExpenses = [...expenses];

  if (userId) {
    newExpenses = newExpenses.filter(el => +el.userId === +userId);
  };

  if (from) {
    const dateFrom = new Date(from).valueOf();

    newExpenses = newExpenses
      .filter(el => new Date(el.spentAt).valueOf() > dateFrom);
  };

  if (to) {
    const dateTo = new Date(to).valueOf();

    newExpenses = newExpenses
      .filter(el => new Date(el.spentAt).valueOf() < dateTo);
  };

  if (categories) {
    newExpenses = newExpenses.filter(el => el.category === categories);
  };


  res.statusCode = 200;
  res.send(newExpenses);
};

const createExpense = (req, res) => {
  const expenseData = { ...req.body };
  const prepExpData = Object.keys(expenseData)
    .filter(key => key !== 'userId')
    .sort()
    .join('');
  const prepDefExpData = Object.keys(defaultExpense)
    .filter(key => key !== 'userId')
    .sort()
    .join('');
  const searchUser = users.find(user => +user.id === +expenseData.userId);

  if (prepExpData !== prepDefExpData
    || !searchUser) {
    res.statusCode = 400;
    res.send('Expense parameters is not valid');
  } else {
    const newExpense = {
      ...expenseData,
      id: generateId(),
    };

    expenses.push(newExpense);

    res.statusCode = 201;
    res.send(newExpense);
  }
};

const updateExpense = (req, res) => {
  const expenseData = req.body;
  const { expenseId } = req.params;

  if (Object.keys(expenseData).some(key => (
    !Object.keys(defaultExpense).includes(key)
  ))) {
    res.status(400);
    res.send('Expense parameters is not valid');
  } else {
    const expense = expenses.find(el => el.id === +expenseId);

    if (expense) {
      Object.assign(expense, expenseData);

      res.statusCode = 200;
      res.send(expense);
    } else {
      res.statusCode = 404;
      res.send('Expense not found');
    }
  }
};

const deleteExpense = (req, res) => {
  const { expenseId } = req.params;
  const index = expenses.findIndex(el => el.id === +expenseId);

  if (index > -1) {
    expenses.splice(index, 1);

    res.sendStatus(204);
  } else {
    res.sendStatus(404);
  }
};

const clearExpenses = () => {
  expenses.length = 0;
};

module.exports = {
  getExpenseById,
  getAllExpenses,
  createExpense,
  updateExpense,
  deleteExpense,
  clearExpenses,
  expenses,
};
