'use strict';

const { getUserById } = require('./users');

let expenses = [];

function getById(id) {
  return expenses.find(expense => expense.id === +id);
};

const getAllExpenses = (req, res) => {
  const { userId, from, to, categories } = req.query;
  let preparedExpenses = expenses;

  if (userId) {
    preparedExpenses = preparedExpenses
      .filter(expense => expense.userId === +userId);
  }

  if (from) {
    const fromDate = new Date(from);

    preparedExpenses = preparedExpenses.filter(expense =>
      new Date(expense.spentAt) > fromDate
    );
  }

  if (to) {
    const toDate = new Date(to);

    preparedExpenses = preparedExpenses.filter(expense =>
      new Date(expense.spentAt) < toDate
    );
  }

  if (categories) {
    preparedExpenses = preparedExpenses
      .filter(expense => expense.category === categories);
  }

  res.send(preparedExpenses);
};

const getExpenseById = (req, res) => {
  const { expenseId } = req.params;

  const foundExpense = getById(expenseId);

  if (!foundExpense) {
    res.sendStatus(404);

    return;
  }

  res.send(foundExpense);
};

const addExpense = (req, res) => {
  const {
    userId, spentAt, title, amount, category, note,
  } = req.body;
  const foundUser = getUserById(userId);

  if (userId && !foundUser) {
    res.sendStatus(400);

    return;
  }

  if (!title) {
    res.sendStatus(400);

    return;
  }

  const newExpense = {
    id: expenses.length + 1,
    userId,
    spentAt,
    title,
    amount,
    category,
    note,
  };

  expenses.push(newExpense);

  res.statusCode = 201;

  res.send(newExpense);
};

const removeExpense = (req, res) => {
  const { expenseId } = req.params;
  const filteredExpenses = expenses
    .filter(expense => expense.id !== +expenseId);

  if (filteredExpenses.length === expenses.length) {
    res.sendStatus(404);

    return;
  }

  expenses = filteredExpenses;
  res.sendStatus(204);
};

const updateExpense = (req, res) => {
  const { id } = req.params;
  const foundExpense = getById(id);

  if (!foundExpense) {
    res.sendStatus(404);

    return;
  }

  for (const item in req.body) {
    if (item) {
      foundExpense[item] = req.body[item];
    }
  }

  res.sendStatus = 200;

  res.send(foundExpense);
};

const clearExpenses = () => {
  expenses.length = 0;
};

module.exports = {
  getAllExpenses,
  getExpenseById,
  addExpense,
  removeExpense,
  updateExpense,
  clearExpenses,
  expenses,
};
