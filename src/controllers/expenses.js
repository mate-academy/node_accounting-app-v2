'use strict';

const expensesServices = require('../services/expenses');
const userServices = require('../services/users');

const getAllExpenses = (req, res) => {
  const { from, to, category, userId } = req.query;
  const expenses = expensesServices.getExpenses();

  if (category) {
    const searchByCategoties = expenses
      .filter(expense => expense.category === category);

    res.statusCode = 200;
    res.send(searchByCategoties);

    return;
  }

  if (from && to) {
    const searchExpensesByDate = expenses.filter(
      (expense) => new Date(expense.spentAt)
        .getTime() > new Date(from).getTime()
      && new Date(expense.spentAt).getTime() < new Date(to).getTime()
    );

    res.send(searchExpensesByDate);
    res.statusCode = 200;

    return;
  }

  if (userId) {
    const searchByUserId = expenses
      .filter(expense => expense.userId === +userId);

    res.statusCode = 200;
    res.send(searchByUserId);

    return;
  }

  res.statusCode = 200;
  res.send(expenses);
};

const getExpenseById = (req, res) => {
  const { id } = req.params;

  const foundExpense = expensesServices.getExpensesById(id);

  if (!foundExpense) {
    res.sendStatus(404);

    return;
  }

  res.statusCode = 200;
  res.send(foundExpense);
};

const createExpense = (req, res) => {
  const expense = req.body;

  const { userId } = expense;

  const foundUser = userServices.getUserById(userId);

  if (!foundUser) {
    res.sendStatus(400);

    return;
  }

  const newExpense = expensesServices
    .createExpense(expense, userServices.getUsers());

  res.statusCode = 201;
  res.send(newExpense);
};

const removeExpense = (req, res) => {
  const { id } = req.params;

  const filteredExpenses = expensesServices.getExpensesById(id);

  if (!filteredExpenses) {
    res.sendStatus(404);

    return;
  }

  expensesServices.removeExpense(id);

  res.sendStatus(204);
};

const updateExpense = (req, res) => {
  const { id } = req.params;

  const { title } = req.body;

  const foundExpense = expensesServices.getExpensesById(id);

  if (!foundExpense) {
    res.sendStatus(404);

    return;
  }

  if (typeof title !== 'string') {
    res.sendStatus(400);
  }

  expensesServices.updateExpense({
    id,
    title,
  });

  res.statusCode = 200;
  res.send(foundExpense);
};

module.exports = {
  getAllExpenses,
  getExpenseById,
  createExpense,
  removeExpense,
  updateExpense,
};
