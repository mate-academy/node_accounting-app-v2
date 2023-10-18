'use strict';

const expensesServices = require('../services/expensesServices');
const usersServices = require('../services/usersServices');

const getAll = (req, res) => {
  const {
    userId,
    categories,
    from,
    to,
  } = req.query;

  let expenses = expensesServices.getAll();

  if (userId) {
    expenses = expenses
      .filter(expense => expense.userId === +userId);
  }

  if (from) {
    expenses = expenses.filter(expense => (
      new Date(expense.spentAt) >= new Date(from))
    );
  }

  if (to) {
    expenses = expenses.filter(expense => (
      new Date(expense.spentAt) <= new Date(to))
    );
  }

  if (categories) {
    expenses = expenses
      .filter(expense => categories.includes(expense.category));
  }

  res.statusCode = 200;
  res.send(expenses);
};

const getById = (req, res) => {
  const expenseId = +req.params.id;

  if (!expenseId) {
    res.sendStatus(400);

    return;
  }

  const foundExpense = expensesServices.getById(expenseId);

  if (!foundExpense) {
    res.sendStatus(404);

    return;
  }

  res.statusCode = 200;
  res.send(foundExpense);
};

const create = (req, res) => {
  const {
    userId,
    spentAt,
    title,
    amount,
    category,
    note,
  } = req.body;

  if (!title || !userId || !category || !note || !amount || !spentAt) {
    res.sendStatus(400);
    res.send('Fill all fields');

    return;
  }

  const foundUser = usersServices.getById(userId);

  if (!foundUser) {
    res.sendStatus(400);
    res.send('User is not found');

    return;
  }

  const newExpense = expensesServices.create({
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

const remove = (req, res) => {
  const expenseId = +req.params.id;
  const foundExpense = expensesServices.getById(expenseId);

  if (!foundExpense) {
    res.sendStatus(404);

    return;
  }

  expensesServices.remove(expenseId);
  res.sendStatus(204);
};

const update = (req, res) => {
  const expenseId = +req.params.id;

  const foundExpense = expensesServices.getById(expenseId);

  if (!foundExpense) {
    res.sendStatus(404);
    res.send('Expense is not found');

    return;
  }

  const updatedExpense = expensesServices.update(expenseId, req.body);

  res.sendStatus(200);
  res.send((updatedExpense));
};

module.exports = {
  getAll,
  getById,
  create,
  remove,
  update,
};
