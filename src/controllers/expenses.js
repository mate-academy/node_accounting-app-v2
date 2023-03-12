'use strict';

const { expensesServices } = require('../services/expensesServices');
const { userServices } = require('../services/usersServices');

const getAllExpense = (req, res) => {
  const filter = req.query;
  const preperedExpenses = expensesServices.getAllExpenses(filter);

  res.send(preperedExpenses);
};

const getExpenseById = (req, res) => {
  const expenseId = +req.params.expenseId;

  if (isNaN(expenseId)) {
    res.sendStatus(404);

    return;
  }

  const foundExpenses = expensesServices.getExpenseById(expenseId);

  if (!foundExpenses) {
    res.sendStatus(404);

    return;
  }

  res.send(foundExpenses);
};

const addExpense = (req, res) => {
  const { userId, spentAt, title, amount, category, note } = req.body;

  const isCorrectDataValue = typeof userId === 'number'
    && typeof spentAt === 'string'
    && typeof title === 'string'
    && typeof amount === 'number'
    && typeof category === 'string'
    && typeof note === 'string';

  const isUser = userServices.getAllUsers().some(user => userId === user.id);

  if (!isCorrectDataValue || !isUser) {
    res.sendStatus(400);

    return;
  }

  const newExpense = expensesServices.addNewExpense(
    userId,
    spentAt,
    title,
    amount,
    category,
    note,
  );

  res.statusCode = 201;
  res.send(newExpense);
};

const deleteExpense = (req, res) => {
  const expenseId = +req.params.expenseId;

  const filteredExpenses = expensesServices.deleteExpense(expenseId);

  if (!filteredExpenses) {
    res.sendStatus(404);

    return;
  }

  res.sendStatus(204);
};

const updateExpense = (req, res) => {
  const expenseId = +req.params.expenseId;

  const foundExpense = expensesServices.getExpenseById(expenseId);

  if (!foundExpense) {
    res.sendStatus(404);

    return;
  }

  Object.assign(foundExpense, { ...req.body });

  res.send(foundExpense);
};

module.exports = {
  expenseControllers: {
    addExpense,
    getAllExpense,
    getExpenseById,
    deleteExpense,
    updateExpense,
  },
};
