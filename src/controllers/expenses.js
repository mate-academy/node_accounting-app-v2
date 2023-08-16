'use strict';

const { BadRequest, NotFound } = require('http-errors');
const expensesService = require('../services/expenses');

const getAllExpenses = (req, res) => {
  const expenses = expensesService.getAll(req.query);

  res.send(expenses);
};

const getExpense = (req, res) => {
  const { expensesId } = req.params;

  if (isNaN(expensesId)) {
    throw new BadRequest('Invalid expenses id');
  }

  const expenses = expensesService.getOne(expensesId);

  if (!expenses) {
    throw new NotFound('Expenses not found');
  }

  res.send(expenses);
};

const createExpense = (req, res) => {
  const { body } = req;

  const newExpense = expensesService.createOne(body);

  res.status(201).send(newExpense);
};

const updateExpense = (req, res) => {
  const { expensesId } = req.params;
  const { body } = req;

  if (isNaN(expensesId)) {
    throw new BadRequest('Invalid expenses id');
  }

  if (!expensesService.getOne(expensesId)) {
    throw new NotFound('Expenses not found');
  }

  const updatedExpenses = expensesService.updateOne(expensesId, body);

  res.send(updatedExpenses);
};

const deleteExpense = (req, res) => {
  const { expensesId } = req.params;

  if (isNaN(expensesId)) {
    throw new BadRequest('Invalid expenses id');
  }

  if (!expensesService.getOne(expensesId)) {
    throw new NotFound('Expenses not found');
  }

  expensesService.deleteOne(expensesId);

  res.status(204).send();
};

module.exports = {
  getAllExpenses,
  getExpense,
  createExpense,
  updateExpense,
  deleteExpense,
};
