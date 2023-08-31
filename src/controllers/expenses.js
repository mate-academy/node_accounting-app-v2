'use strict';

const expenseService = require('../services/expenses.js');
const userService = require('../services/users.js');

const getAllExpenses = (req, res) => {
  const query = req.query;
  const expenses = expenseService.getAllExpenses(query);

  res.send(expenses);
};

const getOne = (req, res) => {
  const { expenseId } = req.params;
  const foundExpense = expenseService.getById(expenseId);

  if (!foundExpense) {
    res.status(404).send('Not Found');

    return;
  }

  res.send(foundExpense);
};

const add = (req, res) => {
  const { userId, spentAt, title, amount, category, note } = req.body;

  if (!title || !userId || !category || !note || !amount || !spentAt) {
    res.status(400).send('Fill all fields');

    return;
  }

  const foundUser = userService.getById(userId);

  if (!foundUser) {
    res.status(400).send('User is not found');

    return;
  }

  const newExpense = expenseService.create({
    userId,
    spentAt,
    title,
    amount,
    category,
    note,
  });

  res.status(201).send(newExpense);
};

const updateExpense = (req, res) => {
  const { expenseId } = req.params;
  const foundExpense = expenseService.getById(expenseId);

  if (!foundExpense) {
    res.status(404).send('Expense is not found');

    return;
  }

  const { body } = req;

  const updatedExpense = expenseService.update(expenseId, body);

  res.status(200).send(updatedExpense);
};

const remove = (req, res) => {
  const { expenseId } = req.params;
  const foundExpense = expenseService.getById(expenseId);

  if (!foundExpense) {
    res.status(404).send('Not Found');

    return;
  }

  expenseService.remove(expenseId);

  res.status(204).send();
};

module.exports = {
  getAllExpenses,
  getOne,
  add,
  updateExpense,
  remove,
};
