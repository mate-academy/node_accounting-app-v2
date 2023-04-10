'use strict';

const expensesService = require('../services/expenses');
const usersService = require('../services/users');
const { resetExpenses } = expensesService;

const getAll = (req, res) => {
  const {
    userId,
    categories,
    from,
    to,
  } = req.query;
  let expenses = expensesService.getAll();

  if (userId) {
    expenses = expenses.filter(expense => expense.userId === Number(userId));
  }

  if (categories) {
    expenses = expenses
      .filter(expense => categories.includes(expense.category));
  }

  if (from) {
    expenses = expenses.filter(expense => (
      new Date(expense.spentAt).getTime() > new Date(from).getTime()
    ));
  }

  if (to) {
    expenses = expenses.filter(expense => (
      new Date(expense.spentAt).getTime() < new Date(to).getTime()
    ));
  }

  res.send(expenses);
};

const getOne = (req, res) => {
  const { expenseId } = req.params;
  const foundExpense = expensesService.getById(expenseId);

  if (!foundExpense) {
    res.sendStatus(404);

    return;
  }

  res.send(foundExpense);
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

  const foundUser = usersService.getById(userId);

  if (!userId || !foundUser || !title || !spentAt) {
    res.sendStatus(400);

    return;
  }

  const newExpense = expensesService.create({
    userId,
    spentAt,
    title,
    amount,
    category,
    note,
  });

  res.statusCode = 201;
  res.send(newExpense);
};

const remove = (req, res) => {
  const { expenseId } = req.params;

  const foundExpense = expensesService.getById(expenseId);

  if (!foundExpense) {
    res.sendStatus(404);

    return;
  }

  expensesService.remove(expenseId);
  res.sendStatus(204);
};

const update = (req, res) => {
  const { expenseId } = req.params;
  const foundExpense = expensesService.getById(expenseId);

  if (!foundExpense) {
    res.sendStatus(404);

    return;
  }

  expensesService.update(expenseId, { ...req.body });
  res.send(foundExpense);
};

module.exports = {
  getAll,
  getOne,
  add,
  resetExpenses,
  remove,
  update,
};
