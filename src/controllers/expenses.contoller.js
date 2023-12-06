'use strict';

const {
  getAllExpenses,
  getExpenseById,
  createExpense,
  deleteExpense,
  updateExpense,
} = require('../services/expenses.service');

const { getAllUsers } = require('../services/users.service');

const get = (req, res) => {
  const allExpenses = getAllExpenses();
  const { userId, categories, from, to } = req.query;

  let filteredExpenses = null;

  if (categories && userId) {
    filteredExpenses = allExpenses.filter(item => {
      return item.category === categories && item.userId === +userId;
    });

    return res.send(filteredExpenses);
  }

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

  const userToFind = getAllUsers().find(user => user.id === +userId);

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

  res.json(expense);
};

const deleteOne = (req, res) => {
  const { id } = req.params;
  const newExpenses = deleteExpense(id);

  if (!newExpenses) {
    res.sendStatus(404);

    return;
  }

  res.sendStatus(204);
};

const updateOne = (req, res) => {
  const { id } = req.params;
  const { title } = req.body;
  const expense = getExpenseById(id);

  if (!expense) {
    res.sendStatus(404);

    return;
  }

  const changedExpense = updateExpense(id, title);

  res.send(changedExpense);
};

module.exports = {
  get,
  postOne,
  getOneById,
  deleteOne,
  updateOne,
};
