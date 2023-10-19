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

  const getOneExpenses = expensesService.getById(id);

  if (!getOneExpenses) {
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
  } = req.body;

  const user = userService.getById(userId);

  if (!user) {
    res.sendStatus(400);

    return;
  }

  const newExpense = {
    id: +new Date(),
    userId,
    spentAt,
    title,
    amount,
    category,
    note,
  };

  const expense = expensesService.add(newExpense);

  res.statusCode = 201;

  res.send(expense);
};

const remove = (req, res) => {
  const { id } = req.params;

  if (!expensesService.getById(id)) {
    res.sendStatus(404);

    return;
  }

  expensesService.remove(id);

  res.sendStatus(204);
};

const update = (req, res) => {
  const { id } = req.params;

  const getOneExpenses = expensesService.getById(id);

  if (!getOneExpenses) {
    res.sendStatus(404);

    return;
  }

  const updatedExpense = expensesService.update(id, req.body);

  res.send(updatedExpense);
};

module.exports = {
  getAll,
  getOne,
  create,
  remove,
  update,
};
