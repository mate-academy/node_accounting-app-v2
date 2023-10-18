'use strict';

const expensesService = require('../services/expenses.service');
const userService = require('../services/user.service');

const getAll = (req, res) => {
  const {
    userId,
    from,
    to,
    categories,
  } = req.query;

  let categoriesArray;

  if (categories) {
    categoriesArray = Array.isArray(categories)
      ? [...categories]
      : [categories];
  }

  let expenses = expensesService.getAll();

  if (userId) {
    expenses = expenses.filter(expense => expense.userId === Number(userId));
  }

  if (categoriesArray && categoriesArray.length) {
    expenses = expenses
      .filter(expense => categoriesArray.includes(expense.category));
  }

  if (from) {
    expenses = expenses
      .filter(expense =>
        Number(new Date(expense.spentAt)) >= Number(new Date(from)));
  }

  if (to) {
    expenses = expenses
      .filter(expense =>
        Number(new Date(expense.spentAt)) <= Number(new Date(to)));
  }

  res.send(expenses);
};

const getOne = (req, res) => {
  const { id } = req.params;

  const getOneExpenses = expensesService.getExpensesById(id);

  if (!id) {
    res.sendStatus(404);

    return;
  }

  res.send(getOneExpenses);
};

const create = (req, res) => {
  const {
    userId,
    title,
    spentAt,
    amount,
    category,
    note,
  } = req.params;

  const getUser = userService.getUserById(userId);

  if (!title || !getUser) {
    res.sendStatus(400);

    return;
  }

  const newExpense = {
    id: +new Date(),
    userId: getUser,
    spentAt,
    title,
    amount,
    category,
    note,
  };

  const expense = expensesService.addExpenses(newExpense);

  res.statusCode = 201;

  res.send(expense);
};

const remove = (req, res) => {
  const { id } = req.params;

  if (!expensesService.getExpensesById(id)) {
    res.sendStatus(404);

    return;
  }

  expensesService.removeExpenses(id);

  res.sendStatus(204);
};

const update = (req, res) => {
  const { id } = req.params;

  const getOneExpenses = expensesService.getExpensesById(id);

  if (!getOneExpenses) {
    res.sendStatus(404);

    return;
  }

  const updatedExpense = expensesService.updatedExpense(id, req.body);

  res.send(updatedExpense);
};

module.exports = {
  getAll,
  getOne,
  create,
  remove,
  update,
};
