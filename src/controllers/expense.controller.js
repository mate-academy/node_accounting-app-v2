'use strict';

const {
  create,
  getAll,
  getOne,
  update,
  remove,
} = require('../services/expenses.service');
const {
  getById,
} = require('../services/users.service');

const createExpense = (req, res) => {
  const { userId } = req.body;

  const user = getById(userId);

  if (!user) {
    res.sendStatus(400);

    return;
  }

  const newExpense = create(req.body);

  res.statusCode = 201;
  res.send(newExpense);
};

const getAllExpense = (req, res) => {
  const { userId, from, to, categories } = req.query;

  let userExpenses = getAll();

  if (userId) {
    userExpenses = userExpenses
      .filter(expense => expense.userId === +userId);
  }

  if (categories) {
    userExpenses = userExpenses
      .filter(expense => expense.category === categories);
  }

  if (from) {
    const fromDate = new Date(from);

    userExpenses = userExpenses
      .filter(expense => new Date(expense.spentAt) >= fromDate);
  }

  if (to) {
    const toDate = new Date(to);

    userExpenses = userExpenses
      .filter(expense => new Date(expense.spentAt) <= toDate);
  }

  res.send(userExpenses);
};

const getByIdExpense = (req, res) => {
  const { expenseId } = req.params;

  const userExpense = getOne(expenseId);

  if (!userExpense) {
    res.sendStatus(404);

    return;
  }

  res.send(userExpense);
};

const updateExpense = (req, res) => {
  const { expenseId } = req.params;

  const findExpense = getOne(expenseId);

  if (!findExpense) {
    res.sendStatus(404);

    return;
  }

  const { body } = req;

  const updatedExpense = update(expenseId, body);

  res.statusCode = 200;

  res.send(updatedExpense);
};

const removeExpense = (req, res) => {
  const { expenseId } = req.params;
  const findExpense = getOne(expenseId);

  remove(expenseId);

  if (!findExpense) {
    res.sendStatus(404);

    return;
  }

  res.sendStatus(204);
};

module.exports = {
  createExpense,
  getAllExpense,
  getByIdExpense,
  updateExpense,
  removeExpense,
};
