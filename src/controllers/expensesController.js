'use strict';

const expensesModel = require('../models/expenses');
const usersModel = require('../models/users');

const getAllExpenses = (req, res) => {
  const { userId, categories, from, to } = req.query;

  const expenses = expensesModel.getAllExpenses({
    userId,
    categories,
    from,
    to,
  });

  return res.status(200).send(expenses);
};

const getExpenseById = (req, res) => {
  const { expenseId } = req.params;

  if (!expenseId) {
    return res.sendStatus(400);
  }

  const expense = expensesModel.getExpenseById(Number(expenseId));

  if (!expense) {
    return res.status(404).send(`There is no expense with id ${expenseId}`);
  }

  return res.status(200).send(expense);
};

const createExpense = (req, res) => {
  const { userId, spentAt, title, amount, category, note } = req.body;

  if (!userId || !spentAt || !title || !amount || !category || !note) {
    return res.sendStatus(400);
  }

  const user = usersModel.getUserById(userId);

  if (!user) {
    return res.sendStatus(400);
  }

  const newExpense = expensesModel.createExpense({
    userId,
    spentAt,
    title,
    amount,
    category,
    note,
  });

  return res.status(201).send(newExpense);
};

const changeExpenseById = (req, res) => {
  const { expenseId } = req.params;

  const expenseIdNumber = Number(expenseId);

  if (!expenseIdNumber) {
    return res.sendStatus(404);
  }

  const expense = expensesModel.getExpenseById(expenseIdNumber);

  if (!expense) {
    return res
      .status(404)
      .send(`There is no expense with id ${expenseIdNumber}`);
  }

  const updatedExpense = expensesModel.changeExpenseById(
    expenseIdNumber,
    req.body
  );

  return res.status(200).send(updatedExpense);
};

const deleteExpenseById = (req, res) => {
  const { expenseId } = req.params;

  const expenseIdNumber = Number(expenseId);

  if (!expenseIdNumber) {
    return res.sendStatus(400);
  }

  const expense = expensesModel.getExpenseById(expenseIdNumber);

  if (!expense) {
    return res
      .status(404)
      .send(`There is no expense with id ${expenseIdNumber}`);
  }

  expensesModel.deleteExpenseById(expenseIdNumber);

  return res.sendStatus(204);
};

module.exports = {
  getAllExpenses,
  getExpenseById,
  createExpense,
  changeExpenseById,
  deleteExpenseById,
};
