'use strict';

const { getUserById } = require('../services/users');
const {
  getAll,
  getOne,
  create,
  remove,
  update,
} = require('../services/expenses');

const getAllExpenses = (req, res) => {
  const { userId, from, to, categories } = req.query;
  let preparedExpenses = getAll();

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

  const foundExpense = getOne(expenseId);

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

  const newExpense = create({
    userId,
    spentAt,
    title,
    amount,
    category,
    note,
  });

  res.statusCode = 201;

  res.send(newExpense);
};

const removeExpense = (req, res) => {
  const { expenseId } = req.params;
  const foundExpense = getOne(expenseId);

  if (!foundExpense) {
    res.sendStatus(404);

    return;
  }

  remove(expenseId);
  res.sendStatus(204);
};

const updateExpense = (req, res) => {
  const { expenseId } = req.params;
  const expense = getOne(expenseId);

  if (!expense) {
    res.sendStatus(404);

    return;
  }

  const { body } = req;

  update(expenseId, body);

  res.send(expense);
};

module.exports = {
  getAllExpenses,
  getExpenseById,
  addExpense,
  removeExpense,
  updateExpense,
};
