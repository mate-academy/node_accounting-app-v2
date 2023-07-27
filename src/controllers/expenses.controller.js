'use strict';

const { expensesService } = require('../services/expenses.servise');

const getAll = (req, res) => {
  const { userId } = req.params;
  const { categories } = req.params;
  const { from } = req.params;
  const { to } = req.params;

  const expenses = expensesService.getAll(userId, categories, from, to);

  res.send(expenses);
};

const getOne = (req, res) => {
  const { expenseId } = req.params;
  const foundedExpense = expensesService.getById(expenseId);

  if (!foundedExpense) {
    res.sendStatus(404);

    return;
  }

  res.send(foundedExpense);
};

const add = (req, res) => {
  const { userId } = req.body;
  const { spentAt } = req.body;
  const { title } = req.body;
  const { amount } = req.body;
  const { category } = req.body;
  const { note } = req.body;

  if (!userId || !spentAt || !title || !amount || !category || !note) {
    res.sendStatus(400);

    return;
  }

  const newExpense
  = expensesService.create(userId, spentAt, title, amount, category, note);

  res.status(201);
  res.send(newExpense);
};

const remove = (req, res) => {
  const { expenseId } = req.params;
  const foundedExpense = expensesService.getById(expenseId);

  if (!foundedExpense) {
    res.sendStatus(404);

    return;
  }

  const expenses = expensesService.remove(expenseId);

  res.send(expenses);
};

const update = (req, res) => {
  const { expenseId } = req.params;
  const foundedExpense = expensesService.getById(expenseId);

  if (!foundedExpense) {
    res.sendStatus(404);

    return;
  }

  const { spentAt, title, amount, category, note } = req.body;

  expensesService.update({
    expenseId,
    spentAt,
    title,
    amount,
    category,
    note,
  });

  res.send(foundedExpense);
};

const expensesController = {
  getAll,
  getOne,
  add,
  remove,
  update,
};

module.exports = { expensesController };
