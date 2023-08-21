'use strict';

const expensesServises = require('../services/expenses.service');
const usersServises = require('../services/users.service');

const getExpenses = (req, res) => {
  let tempExpenses = expensesServises.getAll();
  const query = req.query;

  if (Object.keys(query).length === 0) {
    res.send(tempExpenses);
  } else {
    const { userId, categories, from, to } = query;

    if (userId) {
      tempExpenses = tempExpenses
        .filter(expense => expense.userId === +userId);
    }

    if (categories) {
      tempExpenses = tempExpenses
        .filter(expense => categories.includes(expense.category));
    }

    if (from) {
      tempExpenses = tempExpenses
        .filter(expense => expense.spentAt >= from);
    }

    if (to) {
      tempExpenses = tempExpenses
        .filter(expense => expense.spentAt <= to);
    }

    res.send(tempExpenses);
  }
};

const getExpenseById = (req, res) => {
  const { id } = req.params;

  const foundExpense = expensesServises.getById(id);

  if (!foundExpense) {
    res.sendStatus(404);

    return;
  }

  res.send(foundExpense);
};

const createExpense = (req, res) => {
  const {
    userId, title, spentAt, amount, category, note,
  } = req.body;

  if (!title || !userId || !spentAt || !category || !note || !amount) {
    res.sendStatus(400);

    return;
  }

  const foundUser = usersServises.getById(userId);

  if (!foundUser) {
    res.statusCode = 400;
    res.send('User is not found');

    return;
  }

  const newExpence = expensesServises.add({
    userId,
    spentAt,
    title,
    amount,
    category,
    note,
  });

  res.statusCode = 201;
  res.send(newExpence);
};

const deleteExpense = (req, res) => {
  const { id } = req.params;

  const foundExpense = expensesServises.getById(id);

  if (!foundExpense) {
    res.sendStatus(404);

    return;
  }

  expensesServises.remove(id);

  res.sendStatus(204);
};

const updateExpense = (req, res) => {
  const { id } = req.params;
  const foundExpense = expensesServises.getById(id);

  if (!foundExpense) {
    res.sendStatus(404);

    return;
  }

  const updatedExpense = expensesServises.update(id, { ...req.body });

  res.statusCode = 200;
  res.send(updatedExpense);
};

module.exports = {
  getExpenses,
  getExpenseById,
  createExpense,
  deleteExpense,
  updateExpense,
};
