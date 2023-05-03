'use strict';

const { ExpensesModel } = require('../models/expenses.js');
const { UsersModel } = require('../models/users.js');

const getAll = (req, res) => {
  const filteredExpenses = ExpensesModel.getAll(req.query);

  res.statusCode = 200;
  res.send(filteredExpenses);
};

const getById = (req, res) => {
  const { expenseId } = req.params;
  const foundExpense = ExpensesModel.getById(Number(expenseId));

  if (!foundExpense) {
    res.sendStatus(404);

    return;
  }

  res.statusCode = 200;
  res.send(foundExpense);
};

const create = (req, res) => {
  const {
    userId,
    spentAt,
    title,
    amount,
    category,
    note,
  } = req.body;

  const isUserExist = UsersModel.getById(Number(userId));

  if (!title || !isUserExist) {
    res.sendStatus(400);

    return;
  }

  const newExpense = ExpensesModel.create(
    userId,
    spentAt,
    title,
    amount,
    category,
    note,
  );

  res.statusCode = 201;
  res.send(newExpense);
};

const remove = (req, res) => {
  const { expenseId } = req.params;
  const isExpenseRemoved = ExpensesModel.remove(Number(expenseId));

  if (!isExpenseRemoved) {
    res.sendStatus(404);

    return;
  }

  res.sendStatus(204);
};

const update = (req, res) => {
  const { expenseId } = req.params;
  const updatedExpense = ExpensesModel.update(Number(expenseId), req.body);

  if (!updatedExpense) {
    res.sendStatus(404);

    return;
  }

  const reqBodyKeys = Object.keys(req.body);

  if (!reqBodyKeys.length
    || reqBodyKeys.includes('id')
    || reqBodyKeys.includes('userId')
  ) {
    res.sendStatus(400);

    return;
  }

  res.statusCode = 200;
  res.send(updatedExpense);
};

module.exports = {
  getAll,
  getById,
  create,
  remove,
  update,
};
