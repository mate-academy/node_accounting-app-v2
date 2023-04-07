'use strict';

const { expenses } = require('../models/expenses');

const initialize = () => expenses.init();

const getAll = () => expenses.getAll();

const getById = (expenseId) => expenses.getById(expenseId);

const getByParameters = (userId, categories, from, to) => (
  expenses.getByParameters(userId, categories, from, to)
);

const create = (data) => expenses.create(data);

const remove = (expenseId) => expenses.delete(expenseId);

const update = (expense, data) => expenses.update(expense, data);

module.exports = {
  initialize,
  getAll,
  getById,
  getByParameters,
  create,
  remove,
  update,
};
