'use strict';

const expencesServices = require('../sevices/expenses.service');
const userServices = require('../sevices/users.service');

const getAll = (req, res) => {
  const { userId, from, to, categories } = req.query;
  let expenses = expencesServices.getAll();

  if (userId) {
    expenses = expenses
      .filter(expense => expense.userId === +userId);
  }

  if (from) {
    expenses = expenses
      .filter(expense => new Date(expense.spentAt) >= new Date(from));
  }

  if (to) {
    expenses = expenses
      .filter(expense => new Date(expense.spentAt) <= new Date(to));
  }

  if (categories) {
    expenses = expenses
      .filter(expense => categories.includes(expense.category));
  }

  res.send(expenses);
};

const getOne = (req, res) => {
  const { expenseId } = req.params;
  const findExpense = expencesServices.getById(expenseId);

  if (!findExpense) {
    res.sendStatus(404);

    return;
  }
  res.send(findExpense);
};

const create = (req, res) => {
  const { userId, amount, category, note, title, spentAt } = req.body;

  const findUser = userServices.getById(userId);

  if (!findUser && userId) {
    res.sendStatus(400);

    return;
  }

  if (!title) {
    res.sendStatus(400);

    return;
  }

  const newExpense = expencesServices.create({
    userId, amount, category, note, title, spentAt,
  });

  res.statusCode = 201;
  res.send(newExpense);
};

const update = (req, res) => {
  const { expenseId } = req.params;

  const expense = expencesServices.getById(expenseId);

  if (!expense) {
    res.sendStatus(404);

    return;
  }

  const { body } = req;

  expencesServices.update(body);

  res.send(expense);
};

const remove = (req, res) => {
  const { expenseId } = req.params;
  const findExpense = expencesServices.getById(expenseId);

  if (findExpense) {
    res.sendStatus(404);

    return;
  }

  expencesServices.remove(expenseId);
  res.sendStatus(204);
};

module.exports = {
  getAll,
  getOne,
  create,
  update,
  remove,
};