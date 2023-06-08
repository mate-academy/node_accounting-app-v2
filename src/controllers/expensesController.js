'use strict';

const userServices = require('../services/usersServices.js');
const { getMaxId, handleDate } = require('../utils/helpers.js');
const expensesService = require('../services/expensesServices.js');

const getAll = (req, res) => {
  let filteredExpenses = expensesService.getAll();
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

  return res.send(filteredExpenses);
};

const createExpense = (req, res) => {
  const { userId, spentAt, title, amount, category, note } = req.body;

  if (!userId || !spentAt || !title || !amount || !category || !note) {
    return res.sendStatus(400);
  }

  const foundUser = userServices.findUserById(userId);

  if (!foundUser) {
    return res.sendStatus(400);
  }

  const expenses = expensesService.getAll();

  const newExpense = {
    id: getMaxId(expenses),
    userId,
    spentAt,
    title,
    amount,
    category,
    note,
  };

  expensesService.createExpense(newExpense);

  return res.status(201).send(newExpense);
};

const findById = (req, res) => {
  const { expenseId } = req.params;
  const foundExpense = expensesService.findById(expenseId);

  if (!foundExpense) {
    return res.sendStatus(404);
  }

  return res.send(foundExpense);
};

const deleteById = (req, res) => {
  const { expenseId } = req.params;
  const expenses = expensesService.getAll();
  const filteredExpenses = expensesService.removeById(expenseId);

  if (filteredExpenses.length === expenses.length) {
    return res.sendStatus(404);
  }

  expensesService.updateUsersList(filteredExpenses);

  return res.sendStatus(204);
};

const changeById = (req, res) => {
  const { expenseId } = req.params;

  if (!expenseId) {
    return res.sendStatus(400);
  }

  const body = req.body;

  const foundExpense = expensesService.findById(expenseId);

  if (!foundExpense) {
    return res.sendStatus(404);
  }
  expensesService.changeById(foundExpense, body);

  return res.send(foundExpense);
};

module.exports = {
  getAll,
  createExpense,
  findById,
  deleteById,
  changeById,
};
