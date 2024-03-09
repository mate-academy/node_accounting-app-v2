'use strict';

const { isNum, isDate, isStr } = require('../../helpers/isExistAndType');
const expensesService = require('./expenses.service');
const usersService = require('../users/users.service');

function bodyIsInvalid(expense) {
  const { userId, spentAt, title, amount, category, note } = expense;

  return !isNum(userId)
    || !isDate(spentAt)
    || !isStr(title)
    || !isNum(amount)
    || !isStr(category)
    || !isStr(note);
}

function getAll(req, res) {
  const { userId: userIdStr, categories, from, to } = req.query;
  const dateFrom = from ? new Date(from) : undefined;
  const dateTo = to ? new Date(to) : undefined;
  const users = usersService.getAll();
  const userId = userIdStr ? Number(userIdStr) : undefined;

  if (userId !== undefined && Number.isNaN(userId)) {
    return res.sendStatus(400);
  }

  if (userId !== undefined && !users.some(user => user.id === userId)) {
    return res.sendStatus(400);
  }

  const expenses = expensesService.getAll(userId, categories, dateFrom, dateTo);

  res.json(expenses);
}

function getOne(req, res) {
  const { id } = req.params;
  const expense = expensesService.getOne(Number(id));

  if (!expense) {
    return res.sendStatus(404);
  }

  res.send(expense);
}

function add(req, res) {
  const expense = req.body;
  const users = usersService.getAll();

  if (bodyIsInvalid(expense)) {
    return res.sendStatus(400);
  }

  if (!users.some(user => user.id === expense.userId)) {
    return res.sendStatus(400);
  }

  const newExpense = expensesService.add(expense);

  res.status(201).send(newExpense);
}

function remove(req, res) {
  const { id } = req.params;
  const normalizedId = Number(id);

  if (!isNum(normalizedId)) {
    return res.sendStatus(404);
  }

  const isRemoved = expensesService.remove(normalizedId);

  if (!isRemoved) {
    return res.sendStatus(404);
  }

  res.sendStatus(204);
}

function update(req, res) {
  const { id } = req.params;
  const { userId, spentAt, title, amount, category, note } = req.body;
  const users = usersService.getAll();

  if (userId !== undefined && !users.some(user => user.id === userId)) {
    return res.sendStatus(400);
  }

  if (spentAt !== undefined && !isDate(spentAt)) {
    return res.sendStatus(400);
  }

  if (title !== undefined && !isStr(title)) {
    return res.sendStatus(400);
  }

  if (amount !== undefined && !isNum(amount)) {
    return res.sendStatus(400);
  }

  if (category !== undefined && !isStr(category)) {
    return res.sendStatus(400);
  }

  if (note !== undefined && !isStr(note)) {
    return res.sendStatus(400);
  }

  const updatedExpense = expensesService.update({
    id: Number(id), userId, spentAt, title, amount, category, note,
  });

  if (!updatedExpense) {
    return res.sendStatus(404);
  }

  res.send(updatedExpense);
}

module.exports = { getAll, getOne, add, remove, update };
