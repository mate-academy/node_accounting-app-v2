'use strict';

const {
  getAllExpenses,
  getExpenseById,
  createExpense,
  deleteExpense,
  setAllExpenses,
  changeExpense,
} = require('../services/expense.service');

const { getAll } = require('../services/user.service');

const get = (req, res) => {
  const allExpenses = getAllExpenses();
  const { userId, categories, from, to } = req.query;
  let filteredExpenses = null;

  if (categories && userId) {
    filteredExpenses = allExpenses.filter(item => {
      return item.category === categories;
    });

    return res.send(filteredExpenses);
  };

  if (userId) {
    filteredExpenses = allExpenses.filter(item => {
      return item.userId === +userId;
    });

    return res.send(filteredExpenses);
  }

  if (allExpenses.length === 0) {
    return res.send([]);
  }

  if (from && to) {
    filteredExpenses = allExpenses.filter(item => {
      return item.spentAt > from && item.spentAt < to;
    });

    return res.send(filteredExpenses);
  }

  return res.send(allExpenses);
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

const changedOne = (req, res) => {
  const { id } = req.params;
  const { title } = req.body;

  const expense = getExpenseById(id);

  if (!expense) {
    res.sendStatus(404);

    return;
  }

  const changedExpense = changeExpense(title, expense);

  return res.send(changedExpense);
};

module.exports = {
  get,
  postOne,
  getOneById,
  deleteOne,
  changedOne,
};
