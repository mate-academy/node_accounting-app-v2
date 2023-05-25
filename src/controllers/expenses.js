'use strict';

const { expensesService } = require('../services/expenses');
const { usersService } = require('../services/users');

const getAll = (req, res) => {
  const { userId, categories, from, to } = req.query;

  const expenses = expensesService.getAll(
    {
      userId,
      categories,
      from,
      to,
    }
  );

  res.send(expenses);
};

const getOne = (req, res) => {
  const { expenseId } = req.params;

  if (!expenseId) {
    return res.sendStatus(400);
  }

  const expense = expensesService.getById(expenseId);

  if (!expense) {
    return res
      .status(404).send({ message: `Expense with id ${expenseId} not found` });
  }

  res.send(expense);
};

const add = (req, res) => {
  const {
    userId,
    spentAt,
    title,
    amount,
    category,
    note,
  } = req.body;

  if (!userId || !spentAt || !title || !amount || !category) {
    return res.sendStatus(400);
  }

  const user = usersService.getById(userId);

  if (!user) {
    return res
      .status(404).send({ message: `User with id ${userId} not found` });
  }

  const expense = expensesService.create({
    userId,
    spentAt,
    title,
    amount,
    category,
    note,
  });

  res.status(201).send(expense);
};

const remove = (req, res) => {
  const { expenseId } = req.params;

  if (!expenseId) {
    return res.sendStatus(400);
  }

  const expense = expensesService.getById(expenseId);

  if (!expense) {
    return res
      .status(404).send({ message: `Expense with id ${expenseId} not found` });
  }

  expensesService.removeById(expenseId);

  res.sendStatus(204);
};

const update = (req, res) => {
  const { expenseId } = req.params;

  if (!expenseId) {
    return res.sendStatus(400);
  }

  const expense = expensesService.getById(expenseId);

  if (!expense) {
    return res
      .status(404).send({ message: `Expense with id ${expenseId} not found` });
  }

  const {
    spentAt,
    title,
    amount,
    category,
    note,
  } = req.body;

  expensesService.update(expense, {
    spentAt,
    title,
    amount,
    category,
    note,
  });

  res.send(expense);
};

module.exports = {
  expensesController: {
    getAll,
    getOne,
    add,
    remove,
    update,
  },
};
