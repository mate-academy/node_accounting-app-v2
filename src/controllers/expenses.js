'use strict';

const expensesServices = require('../services/expennses');
const userServices = require('../services/users');

const getAll = (req, res) => {
  const partsUrl = req.url.split('?');
  const urlParams = new URLSearchParams(partsUrl[1]);

  const userId = urlParams.get('userId');
  const category = urlParams.get('category');
  const from = urlParams.get('from');
  const to = urlParams.get('to');

  let expenses = expensesServices.getAllExpenses();

  if (userId) {
    expenses = expenses.filter(el => el.userId === +userId);
  }

  if (category) {
    expenses = expenses.filter(el => el.category === category);
  }

  if (from && to) {
    expenses = expenses.filter(el => el.spentAt > from && el.spentAt < to);
  }

  res.send(expenses);
};

const getOne = (req, res) => {
  const { id } = req.params;
  const expense = expensesServices.getExpense(+id);

  if (!expense) {
    res.sendStatus(404);

    return;
  }

  res.send(expense);
};

const add = (req, res) => {
  const { title, amount, category, note, userId, spentAt } = req.body;
  const owner = userServices.getUser(+userId);

  if (!title || !amount || !category || !note || !owner || !spentAt) {
    res.sendStatus(400);

    return;
  }

  const newExpense = expensesServices.createExpense(req.body);

  res.statusCode = 201;
  res.send(newExpense);
};

const remove = (req, res) => {
  const { id } = req.params;
  const expense = expensesServices.getExpense(+id);

  if (!expense) {
    res.sendStatus(404);

    return;
  }

  expensesServices.removeExpense(+id);
  res.sendStatus(204);
};

const update = (req, res) => {
  const { id } = req.params;
  const expense = expensesServices.getExpense(+id);

  if (!expense) {
    res.sendStatus(404);

    return;
  }

  expensesServices.updateExpense(+id, req.body);
  res.send(expense);
};

module.exports = {
  getAll,
  getOne,
  add,
  remove,
  update,
};
