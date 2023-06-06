'use strict';

const userService = require('../services/users');
const expensesService = require('../services/expenses');

const getAllExpenses = (req, res) => {
  const {
    userId,
    categories,
    from,
    to,
  } = req.query;

  let expenses = expensesService.getAllExpenses();

  if (userId) {
    expenses = expenses.filter(expense => expense.userId === +userId);
  }

  if (categories) {
    expenses = expenses.filter(({ category }) => (
      categories.includes(category)
    ));
  }

  if (from && to) {
    expenses = expenses.filter(expense => {
      const expenseDate = new Date(expense.spentAt);
      const fromDate = new Date(from);
      const toDate = new Date(to);

      return expenseDate < toDate && fromDate <= expenseDate;
    });
  };

  res.send(expenses);
};

const getOneExpence = (req, res) => {
  const { expenseId } = req.params;
  const foundExpens = expensesService.findExpensesById(+expenseId);

  if (!foundExpens) {
    res.sendStatus(404);

    return;
  }

  res.send(foundExpens);
};

const createExpense = (req, res) => {
  const dataExpense = req.body;
  const userExpense = userService.findUserById(+dataExpense.userId);

  if (!Object.entries(dataExpense).length || !userExpense) {
    res.sendStatus(400);

    return;
  }

  const newExpense = expensesService.createExpense(dataExpense);

  res.status(201);
  res.send(newExpense);
};

const removeExpense = (req, res) => {
  const { expenseId } = req.params;
  const foundExpense = expensesService.findExpensesById(+expenseId);

  if (!foundExpense) {
    res.sendStatus(404);

    return;
  }

  expensesService.removeExpense(+expenseId);
  res.sendStatus(204);
};

const updateExpense = (req, res) => {
  const { expenseId } = req.params;
  const bodyExpense = req.body;
  const updatedExpense = expensesService.updateExpense(expenseId, bodyExpense);

  if (!updatedExpense) {
    res.sendStatus(404);

    return;
  }

  res.status(200);
  res.send(updatedExpense);
};

module.exports = {
  getAllExpenses,
  getOneExpence,
  createExpense,
  removeExpense,
  updateExpense,
};
