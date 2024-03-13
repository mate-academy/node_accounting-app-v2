'use strict';

const expenseService = require('../services/expenses.service');
const userService = require('../services/user.service');
const {
  OK,
  CREATED,
  NO_CONTENT,
  BAD_REQUEST,
  NOT_FOUND,
} = require('../variables');

const getExpenses = (req, res) => {
  const { from, to, categories } = req.query;
  const userId = parseInt(req.query.userId);

  let filteredExpenses = expenseService.getAll();

  if (userId) {
    filteredExpenses = filteredExpenses.filter(
      expense => expense.userId === userId);
  }

  if (categories) {
    const categoryList = categories.split(',');

    filteredExpenses = filteredExpenses.filter(
      expense => categoryList.includes(expense.category));
  }

  if (from && to) {
    filteredExpenses = filteredExpenses.filter(expense =>
      new Date(expense.spentAt)
      >= new Date(from) && new Date(expense.spentAt) <= new Date(to)
    );
  }

  res.status(OK).send(filteredExpenses);
};

const getOne = (req, res) => {
  const expenseId = parseInt(req.params.id);
  const expense = expenseService.getById(expenseId);

  if (!expense) {
    res.status(NOT_FOUND).send({ message: 'Expense not found' });
  }

  res.status(OK).send(expense);
};

const create = (req, res) => {
  const { userId, spentAt, title, amount, category, note } = req.body;

  if (!userId || !spentAt || !title || !amount || !category || !note) {
    res.status(BAD_REQUEST).send({ message: 'Required parameter(s) missing' });

    return;
  }

  const user = userService.getById(parseInt(userId));

  if (!user) {
    res.status(BAD_REQUEST).send({ message: 'Required parameter(s) missing' });

    return;
  }

  const expense = expenseService.create(
    userId, spentAt, title, amount, category, note
  );

  res.status(CREATED).send(expense);
};

const update = (req, res) => {
  const id = parseInt(req.params.id);
  const expense = expenseService.getById(id);

  if (!expense) {
    res.status(NOT_FOUND).send({ message: 'Expense not found' });

    return;
  }

  const { title, amount, category, note } = req.body;

  const updatedExpense = expenseService.update(
    {
      id,
      title,
      amount,
      category,
      note,
    }
  );

  res.status(OK).send(updatedExpense);
};

const remove = (req, res) => {
  const expenseId = parseInt(req.params.id);

  if (!expenseService.getById(expenseId)) {
    return res.status(NOT_FOUND).send({ message: 'Expense not found' });
  }

  expenseService.remove(expenseId);
  res.status(NO_CONTENT).end();
};

module.exports = {
  getExpenses,
  getOne,
  create,
  update,
  remove,
};
