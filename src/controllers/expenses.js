'use strict';

const expensesServices = require('../services/expenses');

const getAllFiltered = (req, res) => {
  const query = req.query;

  if (!query) {
    res.send(expensesServices.expenses);
  }

  const filteredExpenses = expensesServices.getAllFiltered(query);

  res.send(filteredExpenses);
};
const getById = (req, res) => {
  const { expenseId } = req.params;
  const foundedExpense = expensesServices.getById(expenseId);

  if (!foundedExpense) {
    res.sendStatus(404);

    return;
  }
  res.send(foundedExpense);
};

const create = (req, res) => {
  const { userId, spentAt, title, amount, category, note } = req.body;

  const { newExpense, currentUser } = expensesServices.create({
    userId,
    spentAt,
    title,
    amount,
    category,
    note,
  });

  const parametersExist = currentUser && spentAt && title && amount && category;

  if (!parametersExist) {
    res.sendStatus(400);

    return;
  }

  expensesServices.expenses.push(newExpense);
  res.status(201).json(newExpense);
};

const remove = (req, res) => {
  const { expenseId } = req.params;
  const foundExpense = expensesServices.getById(expenseId);

  if (!foundExpense) {
    res.sendStatus(404);

    return;
  }

  expensesServices.remove(expenseId);

  res.sendStatus(204);
};

const update = (req, res) => {
  const { title } = req.body;
  const { expenseId } = req.params;
  const foundExpense = expensesServices.getById(expenseId);

  if (!foundExpense) {
    res.sendStatus(404);

    return;
  }

  if (typeof title !== 'string') {
    res.sendStatus(422);

    return;
  }

  expensesServices.update({
    foundExpense,
    title,
  });

  res.send(foundExpense);
};

module.exports = {
  getAllFiltered,
  getById,
  create,
  remove,
  update,
};
