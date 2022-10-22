'use strict';

const {
  expenseServices,
} = require('../services/expenses.js');

const {
  userServices,
} = require('../services/users.js');

const createExpense = (req, res) => {
  const newExpense = req.body;

  if (!newExpense.title) {
    res.statusCode = 400;
    res.send();

    return;
  }

  const { userId } = newExpense;

  const user = userServices.getUserById(userId);

  if (!user) {
    res.statusCode = 400;
    res.send();

    return;
  };

  const createdExpense = expenseServices.addExpense(newExpense);

  res.statusCode = 201;
  res.send(createdExpense);
};

const getExpenses = (req, res) => {
  const expenses = expenseServices.getAllExpenses();

  res.statusCode = 200;
  res.send(expenses);
};

const getExpenseById = (req, res) => {
  const { id } = req.params;

  const expense = expenseServices.getExpenseById(id);

  if (!expense) {
    res.statusCode = 404;
    res.send();
  }

  res.statusCode = 200;
  res.send(expense);
};

const getExpensesByQuery = (req, res) => {
  const {
    userId,
    category,
    from,
    to,
  } = req.query;

  let expenses;

  if (userId) {
    expenses = expenseServices.getExpensesByUserId(userId);

    if (!expenses) {
      res.statusCode = 404;
      res.send();

      return;
    }
  } else {
    expenses = expenseServices.getAllExpenses();
  }

  if (from && to) {
    expenses = expenses.filter(({ spentAt }) => spentAt > from && spentAt < to);
  }

  if (category) {
    expenses = expenses.filter((expense) => expense.category === category);
  }

  res.statusCode = 200;
  res.send(expenses);
};

const updateExpense = (req, res) => {
  const { id } = req.params;
  const fieldsToUpdate = req.body;

  const updatedExpense = expenseServices.updateExpense(id, fieldsToUpdate);

  if (!updatedExpense) {
    res.statusCode = 404;
    res.send();

    return;
  }

  res.statusCode = 200;
  res.send(updatedExpense);
};

const deleteExpense = (req, res) => {
  const { id } = req.params;

  const deletedExpense = expenseServices.deleteExpense(id);

  if (!deletedExpense) {
    res.statusCode = 404;
    res.send();

    return;
  }

  res.statusCode = 204;
  res.send();
};

module.exports = {
  createExpense,
  getExpenses,
  getExpensesByQuery,
  getExpenseById,
  updateExpense,
  deleteExpense,
};
