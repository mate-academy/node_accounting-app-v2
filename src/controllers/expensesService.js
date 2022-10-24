'use strict';

const userService = require('./userService.js');

let expenses = [];

const init = () => {
  expenses = [];
};

function foundExpensebyId(id) {
  const numberId = Number(id);
  const foundExpenses = expenses.find(expense => expense.id === numberId);

  return foundExpenses;
};

const createExpence = (req, res) => {
  const {
    userId,
    spentAt,
    title,
    amount,
    category,
    note,
  } = req.body;

  if (!title
    || !userService.exist(userId)
    || !amount) {
    res.sendStatus(400);

    return;
  }

  const createdExpense = {
    id: Math.floor(Math.random() * 100),
    userId,
    spentAt,
    title,
    amount,
    category,
    note,
  };

  expenses.push(createdExpense);
  res.statusCode = 201;
  res.send(createdExpense);
};

const getAllExpensesByParams = (req, res) => {
  const {
    userId,
    category,
    from,
    to,
  } = req.query;

  const numberId = Number(userId);

  res.statusCode = 200;

  if (userService.findUserById(numberId)) {
    let userExpenses = expenses.filter(expense => expense.userId === numberId);

    if (category) {
      userExpenses = userExpenses.filter(
        expense => expense.category === category);
    }
    res.send(userExpenses);

    return;
  }

  if (from && to) {
    const foundExpences = expenses.filter(
      expense => expense.spentAt >= from && expense.spentAt <= to);

    res.send(foundExpences);

    return;
  }

  res.send(expenses);
};

const getExpenceById = (req, res) => {
  const { id } = req.params;
  const numberId = Number(id);

  const foundExpenses = foundExpensebyId(numberId);

  if (!foundExpenses) {
    res.sendStatus(404);

    return;
  }

  res.statusCode = 200;
  res.send(foundExpenses);
};

const updateExpense = (req, res) => {
  const { id } = req.params;

  const foundExpenses = foundExpensebyId(id);

  if (!foundExpenses) {
    res.sendStatus(404);

    return;
  }

  const updatedExpense = Object.assign(foundExpenses, req.body);

  res.statusCode = 200;
  res.send(updatedExpense);
};

const deleteExpense = (req, res) => {
  const { id } = req.params;

  const foundExpenses = foundExpensebyId(id);

  if (!foundExpenses) {
    res.sendStatus(404);

    return;
  }

  expenses = expenses.filter(expense => expense.id !== +id);
  res.sendStatus(204);
};

module.exports = {
  init,
  createExpence,
  getAllExpensesByParams,
  updateExpense,
  deleteExpense,
  getExpenceById,
};
