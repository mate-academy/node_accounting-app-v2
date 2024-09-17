'use strict';

const { getAllUsers } = require('../services/user.service');
const {
  getAllExpenses,
  getExpenseById,
  updateExpense,
  deleteExpenseById,
  setAllExpenses,
  createExpense,
} = require('../services/expense.service');

const STATUS_INVALID_REQUEST = 400;
const MESSAGE_INVALID_REQUEST
  = 'Invalid request data, please check and send again';
const STATUS_NOT_FOUND = 404;
const MESSAGE_NOT_FOUND = 'Data not found';

function get(req, res) {
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

  res.send(allExpenses);
}

function getOneExpense(req, res) {
  const { id } = req.params;
  const expense = getExpenseById(+id);

  if (!expense) {
    res.sendStatus(STATUS_NOT_FOUND).send(MESSAGE_NOT_FOUND);

    return;
  }

  res.send(expense);
}

function addExpense(req, res) {
  const {
    userId,
    spentAt,
    title,
    amount,
    category,
    note,
  } = req.body;

  if (!title || !category || !note || !amount || !userId || !spentAt) {
    res.sendStatus(STATUS_INVALID_REQUEST).send(MESSAGE_INVALID_REQUEST);

    return;
  }

  const user = getAllUsers().find(userToCheck => userToCheck.id === +userId);

  if (!title || !user) {
    res.sendStatus(STATUS_INVALID_REQUEST).send(MESSAGE_INVALID_REQUEST);

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

  res.status(201).send(newExpense);
}

function deleteExpense(req, res) {
  const { id } = req.params;

  const newExpenses = deleteExpenseById(+id);

  if (newExpenses.length === getAllExpenses().length) {
    res.sendStatus(STATUS_NOT_FOUND).send(MESSAGE_NOT_FOUND);

    return;
  }

  setAllExpenses(newExpenses);
  res.sendStatus(204);
}

function changeExpense(req, res) {
  const { id } = req.params;
  const { ...updatedParams } = req.body;
  const expense = getExpenseById(+id);

  if (!expense) {
    res.sendStatus(STATUS_NOT_FOUND).send(MESSAGE_NOT_FOUND);

    return;
  }

  const updatedExpense = updateExpense(expense, updatedParams);

  return res.send(updatedExpense);
}

module.exports = {
  get,
  getOneExpense,
  addExpense,
  deleteExpense,
  changeExpense,
};
