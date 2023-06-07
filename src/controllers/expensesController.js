'use strict';

const expenseService = require('../services/expensesServices.js');
const userServices = require('../services/usersServices');
const { getMaxId } = require('../utils/helpers');
const expensesService = require('../services/expensesServices');

const handleDate = (spentAt, from, to) => {
  return {
    expenseDate: new Date(spentAt),
    fromDate: new Date(from),
    toDate: new Date(to),
  };
};
const getAll = (req, res) => {
  let filteredExpenses = expenseService.getAll();
  const { userId, categories, from, to } = req.query;

  if (userId) {
    filteredExpenses = filteredExpenses
      .filter(expense => expense.userId === Number(userId));
  }

  if (categories) {
    filteredExpenses = filteredExpenses
      .filter(expense => categories.includes(expense.category));
  }

  if (from && to) {
    filteredExpenses = filteredExpenses.filter(expense => {
      const {
        expenseDate,
        toDate,
        fromDate,
      } = handleDate(expense.spentAt, from, to);

      return expenseDate >= fromDate && expenseDate <= toDate;
    });
  }

  res.send(filteredExpenses);
};

const createExpenses = (req, res) => {
  const { userId, spentAt, title, amount, category, note } = req.body;

  if (!userId || !spentAt || !title || !amount || !category || !note) {
    res.sendStatus(400);

    return;
  }

  const foundUser = userServices.foundUser(userId);

  if (!foundUser) {
    res.sendStatus(400);

    return;
  }

  const newExpense = {
    id: getMaxId(expensesService.getAll()),
    userId,
    spentAt,
    title,
    amount,
    category,
    note,
  };

  expensesService.createExpenses(newExpense);
  res.status(201).send(newExpense);
};

const findById = (req, res) => {
  const { expenseId } = req.params;
  const foundExpense = expensesService.findById(expenseId);

  if (!foundExpense) {
    res.sendStatus(404);

    return;
  }

  res.send(foundExpense);
};

const deleteById = (req, res) => {
  const { expenseId } = req.params;
  let expenses = expensesService.getAll();
  const filteredExpenses = expensesService.removeById(expenseId);

  if (filteredExpenses.length === expenses.length) {
    res.sendStatus(404);

    return;
  }

  expenses = filteredExpenses;
  res.sendStatus(204);
};

const changeById = (req, res) => {
  const { expenseId } = req.params;

  if (!expenseId) {
    res.sendStatus(400);

    return;
  }

  const body = req.body;

  const foundExpense = expensesService.findById(expenseId);

  if (!foundExpense) {
    res.sendStatus(404);

    return;
  }
  expensesService.changeById(foundExpense, body);
  res.send(foundExpense);
};

module.exports = {
  getAll,
  createExpenses,
  findById,
  deleteById,
  changeById,
};
