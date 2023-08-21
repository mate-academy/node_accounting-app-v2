'use strict';

const expenseServices = require('../services/expenses');
const userServices = require('../services/users');

const getAll = (req, res) => {
  const expenses = expenseServices.getAll(req.query);

  res.send(expenses);
};

const getOne = (req, res) => {
  const { expenseId } = req.params;

  if (typeof expenseId !== 'string') {
    res.statusMessage = 'Param "ID" is required';
    res.sendStatus(400);

    return;
  }

  const expense = expenseServices.getById(expenseId);

  if (!expense) {
    res.statusMessage = 'Expense is not found';
    res.sendStatus(404);

    return;
  }

  res.send(expense);
};

const add = (req, res) => {
  const { userId, spentAt, title, amount, category, note } = req.body;

  if (!userId || !spentAt || !title || !amount || !category || !note) {
    res.statusMessage = 'All fields are require';
    res.sendStatus(400);

    return;
  }

  const user = userServices.getById(userId);

  if (!user) {
    res.statusMessage = 'User not found';
    res.sendStatus(400);

    return;
  }

  const newExpense = expenseServices.create({
    userId,
    spentAt,
    title,
    amount,
    category,
    note,
  });

  res.statusCode = 201;
  res.statusMessage = 'Creation successfully';
  res.send(newExpense);
};

const remove = (req, res) => {
  const { expenseId } = req.params;

  if (typeof expenseId !== 'string') {
    res.statusMessage = 'Param "ID" is required';
    res.sendStatus(400);

    return;
  }

  const expense = expenseServices.getById(expenseId);

  if (!expense) {
    res.statusMessage = 'Expense is not found';
    res.sendStatus(404);

    return;
  }

  expenseServices.remove(expenseId);

  res.statusCode = 200;
  res.statusMessage = 'Removal successful';
  res.sendStatus(204);
};

const update = (req, res) => {
  const { expenseId } = req.params;

  if (typeof expenseId !== 'string') {
    res.statusMessage = 'Param "ID" is required';
    res.sendStatus(400);

    return;
  }

  const expense = expenseServices.getById(expenseId);

  if (!expense) {
    res.statusMessage = 'Expense is not found';
    res.sendStatus(404);

    return;
  }

  const { body } = req;

  expenseServices.update(expenseId, body);

  res.statusMessage = 'Update successful';
  res.send(expense);
};

const controllers = {
  getAll,
  getOne,
  add,
  remove,
  update,
};

module.exports = controllers;
