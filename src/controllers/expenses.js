'use strict';

const userService = require('../services/users.js');
const expensesService = require('../services/expenses.js');

const getAll = (req, res) => {
  const { userId, categories, from, to } = {
    ...req.query, ...req.body,
  };
  const expenses = expensesService.getAll({
    userId, categories, from, to,
  });

  res.send(expenses);
};

const getOne = (req, res) => {
  const expensesId = Number(req.params.expensesId);
  const foundExpenses = expensesService.getById(expensesId);

  if (!foundExpenses) {
    res.sendStatus(404);

    return;
  }

  res.send(foundExpenses);
};

const add = (req, res) => {
  const { userId, spentAt, title, amount, category, note } = req.body;

  if (!userId || !spentAt || !title || !amount || !category || !note) {
    res.sendStatus(400);

    return;
  }

  const user = userService.getById(userId);

  if (!user) {
    res.sendStatus(400);

    return;
  }

  const newExpense = expensesService.create(
    userId, spentAt, title, amount, category, note
  );

  res.statusCode = 201;
  res.send(newExpense);
};

const remove = (req, res) => {
  const expensesId = Number(req.params.expensesId);
  const foundExpense = expensesService.getById(expensesId);

  if (!foundExpense) {
    res.sendStatus(404);

    return;
  }

  expensesService.remove(expensesId);
  res.sendStatus(204);
};

const update = (req, res) => {
  const id = Number(req.params.expensesId);
  const foundExpense = expensesService.getById(id);

  if (!foundExpense) {
    res.sendStatus(404);

    return;
  }

  const {
    userId,
    spentAt,
    title,
    amount,
    category,
    note,
  } = req.body;

  const updatedExpenseObject = { id };

  if (typeof userId === 'number') {
    updatedExpenseObject.userId = userId;
  }

  if (typeof spentAt === 'string') {
    updatedExpenseObject.spentAt = spentAt;
  }

  if (typeof title === 'string') {
    updatedExpenseObject.title = title;
  }

  if (typeof amount === 'number') {
    updatedExpenseObject.amount = amount;
  }

  if (typeof category === 'string') {
    updatedExpenseObject.category = category;
  }

  if (typeof note === 'string') {
    updatedExpenseObject.note = note;
  }

  const updatedExpense = expensesService.update(updatedExpenseObject);

  res.send(updatedExpense);
};

module.exports = {
  getAll,
  getOne,
  add,
  remove,
  update,
};
