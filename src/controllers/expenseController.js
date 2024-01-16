'use strict';

const {
  getAll,
  getById,
  createOne,
  deleteOne,
  updateOne,
} = require('../services/expensesServices');
const { findAll } = require('../services/userServices');

const get = (req, res) => {
  const expenseList = getAll();
  const { userId, categories, from, to } = req.query;

  let filteredExpenses = expenseList;

  if (categories && userId) {
    filteredExpenses = expenseList
      .filter(item => item.category === categories && item.userId === +userId);
  } else if (userId) {
    filteredExpenses = expenseList
      .filter(item => item.userId === +userId);
  }

  if (from && to) {
    filteredExpenses = filteredExpenses
      .filter(item => item.spentAt > from && item.spentAt < to);
  }

  return res.send(filteredExpenses.length > 0 ? filteredExpenses : expenseList);
};

const getOne = (req, res) => {
  const { id } = req.params;

  const expenses = getById(+id);

  if (!expenses) {
    res.status(404).send('Expense not found');

    return;
  }

  return res.json(expenses);
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

  const findUser = findAll().find(u => u.id === userId);

  if (!title || !findUser) {
    res.status(400).send('Invalid request: Title or user not provided');

    return;
  }

  const newExpenses = createOne({
    userId,
    spentAt,
    title,
    amount,
    category,
    note,
  });

  res.status(201).send(newExpenses);
};

const deleted = (req, res) => {
  const { id } = req.params;

  if (!getById(+id)) {
    return res.status(404).send('Not Found');
  }

  deleteOne(+id);

  return res.sendStatus(204);
};

const update = (req, res) => {
  const { id } = req.params;
  const { title } = req.body;

  const expenses = getById(+id);

  if (!expenses) {
    res.status(404).send('Not Found');

    return;
  }

  const updatedExpenses = updateOne(title, expenses);

  return res.send(updatedExpenses);
};

module.exports = {
  get,
  getOne,
  create,
  deleted,
  update,
};
