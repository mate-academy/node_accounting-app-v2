'use strict';

const {
  getAllExpenses,
  getExpenseById,
  createExpense,
  deleteExpense,
  setAllExpenses,
  updateExpense,
} = require('../services/expenses.service');

const { getAll } = require('../services/user.service');

const get = (req, res) => {
  const allExpenses = getAllExpenses();
  const { userId, categories, from, to } = req.query;
  let filteredExpenses = allExpenses;

  if (!allExpenses.length) {
    return res.send([]);
  }

  filteredExpenses = filteredExpenses.filter(item => {
    if (categories && userId) {
      return item.category === categories;
    }

    if (userId) {
      return item.userId === +userId;
    }

    if (from && to) {
      return item.spentAt > from && item.spentAt < to;
    }
  });

  if (filteredExpenses.length) {
    res.send(filteredExpenses);
  } else {
    res.send(allExpenses);
  }
};

const postOne = (req, res) => {
  const {
    userId,
    spentAt,
    title,
    amount,
    category,
    note,
  } = req.body;

  const userToFind = getAll().find(user => user.id === +userId);

  if (!title || !userToFind) {
    res.sendStatus(400);

    return;
  }

  const newExpense = createExpense({
    userId,
    spentAt,
    title,
    amount,
    category,
    note,
  });

  res.status(201).json(newExpense);
};

const getOneById = (req, res) => {
  const { id } = req.params;

  const expense = getExpenseById(id);

  if (!expense) {
    res.sendStatus(404);

    return;
  }

  return res.json(expense);
};

const deleteOne = (req, res) => {
  const { id } = req.params;

  const newExpenses = deleteExpense(id);

  if (newExpenses.length === getAllExpenses().length) {
    res.sendStatus(404);

    return;
  }

  setAllExpenses(newExpenses);

  return res.sendStatus(204);
};

const updateOne = (req, res) => {
  const { id } = req.params;
  const { title } = req.body;

  const expense = getExpenseById(id);

  if (!expense) {
    res.sendStatus(404);

    return;
  }

  const changedExpense = updateExpense(title, expense);

  return res.send(changedExpense);
};

module.exports = {
  get,
  postOne,
  getOneById,
  deleteOne,
  updateOne,
};
