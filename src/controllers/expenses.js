'use strict';

const expensesService = require('../services/expenses');
const usersService = require('../services/users');

const getAll = (req, res) => {
  const {
    userId,
    category,
    from,
    to,
  } = req.query;

  const expenses = expensesService.getAll(userId, category, from, to);

  res.send(expenses);
};

const getOne = (req, res) => {
  const { expenseId } = req.params;

  const foundExpense = expensesService.getbyId(expenseId);

  if (!foundExpense) {
    res.sendStatus(404);

    return;
  }

  res.send(foundExpense);
};

function add(req, res) {
  const {
    userId,
    spentAt,
    title,
    amount,
    category,
    note,
  } = req.body;

  const foundUser = usersService.getbyId(userId);

  if (!foundUser) {
    res.sendStatus(400);

    return;
  }

  const newExpense = expensesService.create(
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

function remove(req, res) {
  const { expenseId } = req.params;
  const foundExpenses = expensesService.getbyId(expenseId);

  if (!foundExpenses) {
    res.sendStatus(404);

    return;
  }

  expensesService.remove(expenseId);
  res.sendStatus(204);
};

function update(req, res) {
  const { expenseId } = req.params;
  const foundExpense = expensesService.getbyId(expenseId);

  if (!foundExpense) {
    res.sendStatus(404);

    return;
  }

  const data = req.body;
  const updatedExpense = expensesService.update({
    id: expenseId,
    data,
  });

  res.send(updatedExpense);
};

module.exports = {
  getAll,
  getOne,
  add,
  remove,
  update,
};
