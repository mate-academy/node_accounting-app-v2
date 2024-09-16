'use strict';

const expensesService = require('../services/expenses');
const userService = require('../services/users');

const expenseInterface = {
  userId: 0,
  spentAt: '',
  title: '',
  amount: 0,
  category: '',
  note: '',
};

const checkExpense = (expense) => {
  const interfaceKeys = JSON.stringify(Object.keys(expenseInterface).sort());
  const expenseKeys = JSON.stringify(Object.keys(expense).sort());

  return interfaceKeys === expenseKeys;
};

const getAll = (req, res) => {
  const expenses = expensesService.getAll(req.query);

  res.send(expenses);
};

const getOne = (req, res) => {
  const { id } = req.params;

  if (id === undefined) {
    return res.status(400).send('Id is required');
  }

  const expense = expensesService.getOne(parseInt(id));

  if (!expense) {
    return res.status(404).send('Expense not found');
  }

  res.send(expense);
};

const add = (req, res) => {
  const expenseToAdd = { ...req.body };

  if (!checkExpense(expenseToAdd) || !userService.getOne(expenseToAdd.userId)) {
    return res.status(400).send('Bad request');
  }

  const expense = expensesService.add(expenseToAdd);

  res.status(201).send(expense);
};

const update = (req, res) => {
  const { id } = req.params;
  const expenseData = { ...req.body };

  const expense = expensesService.update(parseInt(id), expenseData);

  if (!expense) {
    return res.status(404).send('Expense not found');
  }

  res.send(expense);
};

const remove = (req, res) => {
  const { id } = req.params;

  const wasRemoved = expensesService.remove(parseInt(id));

  if (!wasRemoved) {
    return res.status(404).send('Expense not found');
  }

  res.status(204).send('');
};

module.exports = {
  getAll,
  getOne,
  add,
  update,
  remove,
};
