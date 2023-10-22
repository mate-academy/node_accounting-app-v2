'use strict';

const statusCode = require('../statusCode');
const service = require('../services/expenses.services');
const userService = require('../services/users.services');

const getExpenses = function(req, res) {
  const userId = req.query.userId;
  const from = req.query.from;
  const to = req.query.to;
  const categories = req.query.categories;

  let expenses = service.getAll();

  if (userId) {
    expenses = expenses.filter(function(expense) {
      return expense.userId === Number(userId);
    });
  }

  if (categories) {
    const selectedCategories = Array.isArray(categories)
      ? categories
      : [categories];

    expenses = expenses.filter(function(expense) {
      return selectedCategories.includes(expense.category);
    });
  }

  if (from) {
    expenses = expenses.filter(function(expense) {
      return new Date(expense.spentAt).valueOf() >= new Date(from).valueOf();
    });
  }

  if (to) {
    expenses = expenses.filter(function(expense) {
      return new Date(expense.spentAt).valueOf() <= new Date(to).valueOf();
    });
  }

  res.statusCode = statusCode.OK;
  res.send(expenses);
};

const postExpense = function(req, res) {
  const userId = req.body.userId;
  const spentAt = req.body.spentAt;
  const title = req.body.title;
  const amount = req.body.amount;
  const category = req.body.category;
  const note = req.body.note;

  if (!userService.getById(Number(userId))) {
    res.sendStatus(statusCode.BAD_REQUEST);

    return;
  }

  const newExpense = {
    id: Number(new Date()),
    userId: userId,
    spentAt: spentAt,
    title: title,
    amount: amount,
    category: category,
    note: note,
  };

  service.add(newExpense);
  res.statusCode = statusCode.CREATED;
  res.send(newExpense);
};

const getExpenseById = function(req, res) {
  const id = req.params.id;

  if (!id) {
    res.sendStatus(statusCode.BAD_REQUEST);

    return;
  }

  const expense = service.getById(Number(id));

  if (!expense) {
    res.sendStatus(statusCode.NOT_FOUND);

    return;
  }

  res.statusCode = statusCode.OK;
  res.send(expense);
};

const deleteExpense = function(req, res) {
  const id = req.params.id;
  const expense = service.getById(Number(id));

  if (!expense) {
    res.sendStatus(statusCode.NOT_FOUND);

    return;
  }

  service.remove(Number(id));
  res.sendStatus(statusCode.NO_CONTENT);
};

const updateExpense = function(req, res) {
  const id = req.params.id;

  if (!id || !req.body) {
    res.sendStatus(statusCode.BAD_REQUEST);

    return;
  }

  if (!service.getById(Number(id))) {
    res.sendStatus(statusCode.NOT_FOUND);

    return;
  }

  res.send(service.update(Number(id), req.body));
};

module.exports = {
  getExpenses,
  postExpense,
  getExpenseById,
  deleteExpense,
  updateExpense,
};
