'use strict';

const expensesServices = require('../services/expenses');

const getAll = (req, res) => {
  const expenses = expensesServices.filterExpenses(req.query);

  res.send(expenses);
};

const getOne = (req, res) => {
  const { id } = req.params;
  const foundExpenses = expensesServices.getById(id);

  if (!foundExpenses) {
    res.status(404).send('Expenses not found');

    return;
  }

  res.send(foundExpenses);
};

const add = (req, res) => {
  const {
    userId,
    spentAt,
    title,
    amount,
    category,
    note,
  } = req.body;

  const isRequiredField = !spentAt
    || !title
    || !amount
    || !category
    || !note;

  if (isRequiredField) {
    res.status(400).send('One of the field is required');

    return;
  }

  const newExpense = expensesServices.create(
    userId,
    spentAt,
    title,
    amount,
    category,
    note,
  );

  res.status(201).send(newExpense);
};

const remove = (req, res) => {
  const { id } = req.params;
  const foundExpenses = expensesServices.getById(id);

  if (!foundExpenses) {
    res.status(404).send('Expenses not found');

    return;
  }

  expensesServices.remove(id);
  res.sendStatus(204);
};

const update = (req, res) => {
  const { id } = req.params;
  const foundExpense = expensesServices.getById(id);

  if (!foundExpense) {
    res.sendStatus(404);

    return;
  }

  const {
    userId = foundExpense.userId,
    spentAt = foundExpense.spentAt,
    title = foundExpense.title,
    amount = foundExpense.amount,
    category = foundExpense.category,
    note = foundExpense.note,
  } = req.body;

  expensesServices.update({
    id,
    userId,
    spentAt,
    title,
    amount,
    category,
    note,
  });

  res.send(foundExpense);
};

module.exports = {
  getAll,
  getOne,
  add,
  remove,
  update,
};
