'use strict';

const expensesService = require('./../services/expenses.service');
const { isValidDate } = require('./../helpers');

const getAll = (req, res) => {
  const { userId, categories, from, to } = req.query;

  const filters = {};

  if (userId && !Number.isNaN(+userId)) {
    filters.userId = +userId;
  }

  if (categories) {
    filters.categories = categories;
  }

  if (from && isValidDate(from)) {
    filters.from = from;
  }

  if (to && isValidDate(to)) {
    filters.to = to;
  }

  res.json(expensesService.getAll(filters));
};

const get = (req, res) => {
  const expense = expensesService.get(+req.params.expenseId);

  res.json(expense);
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

  const expenseData = {
    userId,
    spentAt,
    title,
    amount,
    category,
  };

  if (note) {
    expenseData.note = note;
  }

  const expense = expensesService.create(expenseData);

  res.status(201).json(expense);
};

const update = (req, res) => {
  const {
    spentAt,
    title,
    amount,
    category,
    note,
  } = req.body;

  const updateData = {};

  if (spentAt) {
    updateData.spentAt = spentAt;
  }

  if (title) {
    updateData.title = title;
  }

  if (amount) {
    updateData.amount = amount;
  }

  if (category) {
    updateData.category = category;
  }

  if (note) {
    updateData.note = note;
  }

  const expense = expensesService.update(+req.params.expenseId, updateData);

  res.json(expense);
};

const remove = (req, res) => {
  expensesService.remove(+req.params.expenseId);

  res.sendStatus(204);
};

module.exports = {
  getAll,
  get,
  create,
  update,
  remove,
};
