'use strict';

const expenseService = require('../services/expenses.service');
const userService = require('../services/users.service');
const { instanceNotFound } = require('../utils/instanceNotFound');
const { invalidRequestData } = require('../utils/invalidRequestData');

const get = (req, res) => {
  const { userId, from, to, categories } = req.query;

  res.send(expenseService.getExpenses(userId, from, to, categories));
};

const getOne = (req, res) => {
  const { id } = req.params;

  const expense = expenseService.getById(id);

  if (!expense) {
    return instanceNotFound(res, 'Expense');
  }

  res.send(expense);
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

  if (!userService.getById(userId)) {
    return res
      .status(400)
      .json({
        error: 'User not found',
      });
  }

  if (spentAt instanceof Date) {
    return invalidRequestData(res, 'spentAt');
  }

  if (!category || typeof category !== 'string') {
    return invalidRequestData(res, 'category');
  }

  if (!note || typeof note !== 'string') {
    return invalidRequestData(res, 'note');
  }

  if (amount === undefined || typeof amount !== 'number') {
    return invalidRequestData(res, 'amount');
  }

  if (!title || typeof title !== 'string') {
    return invalidRequestData(res, 'title');
  }

  const newExpense = expenseService.create(
    {
      userId,
      spentAt,
      title,
      amount,
      category,
      note,
    }
  );

  return res.status(201).json(newExpense);
};

const remove = (req, res) => {
  const { id } = req.params;

  if (!expenseService.getById(id)) {
    return instanceNotFound(res, 'Expense');
  }

  expenseService.remove(id);

  res.sendStatus(204);
};

const update = (req, res) => {
  const { id } = req.params;
  const dataToUpdate = req.body;
  const expense = expenseService.getById(id);

  if (!expense) {
    return instanceNotFound(res, 'Expense');
  }

  if (dataToUpdate.spentAt && dataToUpdate.spentAt instanceof Date) {
    return invalidRequestData(res, 'spentAt');
  }

  if (dataToUpdate.category && typeof dataToUpdate.category !== 'string') {
    return invalidRequestData(res, 'category');
  }

  if (dataToUpdate.note && typeof dataToUpdate.note !== 'string') {
    return invalidRequestData(res, 'note');
  }

  if (dataToUpdate.amount && typeof dataToUpdate.amount !== 'number') {
    return invalidRequestData(res, 'amount');
  }

  if (dataToUpdate.title && typeof dataToUpdate.title !== 'string') {
    return invalidRequestData(res, 'title', 'string');
  }

  expenseService.update(id, dataToUpdate);

  res.send(expense);
};

module.exports = {
  get,
  create,
  getOne,
  remove,
  update,
};
