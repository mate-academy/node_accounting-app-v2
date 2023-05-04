'use strict';

const expensesService = require('../services/expenses');
const usersService = require('../services/users');

const getAll = (req, res) => {
  const {
    userId,
    categories,
    from,
    to,
  } = req.query;

  let expenses = expensesService.getAll();

  if (userId) {
    expenses = expenses.filter(expense => expense.userId === +userId);
  }

  if (categories) {
    expenses = expenses.filter(({ category }) => (
      categories.includes(category)
    ));
  }

  if (from && to) {
    const fromDate = new Date(from).getTime();
    const toDate = new Date(to).getTime();

    expenses = expenses.filter(expense => {
      const currentDate = new Date(expense.spentAt).getTime();

      return fromDate <= currentDate && currentDate <= toDate;
    });
  }

  res.send(expenses);
};

const getOne = (req, res) => {
  const { expenseId } = req.params;

  const foundExpense = expensesService.getById(expenseId);

  if (!foundExpense) {
    return res.sendStatus(404);
  }

  res.statusCode = 200;
  res.send(foundExpense);
};

const add = (req, res) => {
  const {
    userId,
    title,
    amount,
    category,
  } = req.body;

  const foundUser = usersService.getById(userId);

  if (!userId || !title || !amount || !category || !foundUser) {
    return res.sendStatus(400);
  }

  const newExpense = expensesService.create(req.body);

  res.statusCode = 201;
  res.send(newExpense);
};

const remove = (req, res) => {
  const { expenseId } = req.params;

  const foundExpenses = expensesService.getById(expenseId);

  if (!foundExpenses) {
    return res.sendStatus(404);
  }

  expensesService.remove(expenseId);
  res.sendStatus(204);
};

const update = (req, res) => {
  const { expenseId } = req.params;
  const { title } = req.body;

  const foundExpense = expensesService.getById(expenseId);

  if (!foundExpense) {
    return res.sendStatus(404);
  }

  expensesService.update(expenseId, title);

  res.statusCode = 200;
  res.send(foundExpense);
};

module.exports = {
  getAll,
  getOne,
  add,
  remove,
  update,
};
