'use strict';

let expenses = [];
const { users } = require('../controllers/usersController');

const reset = () => {
  expenses.length = 0;
};

const getAllExpenses = (req, res) => {
  res.setHeader('Content-Type', 'application/json');

  const { userId, categories, from, to } = req.query;

  if (!userId && !categories && !from && !to) {
    res.send(expenses);

    return;
  }

  if (userId && userId.length > 0) {
    const foundedUser = users.find((user) => user.id === +userId);

    if (!foundedUser) {
      res.sendStatus(404);

      return;
    }

    const foundedExpenses = !categories
      ? expenses.filter((expense) => expense.userId === +userId)
      : expenses.filter((expense) => expense.category === categories);

    res.statusCode = 200;
    res.send(foundedExpenses);

    return;
  }

  if (from.length > 0 && to.length > 0) {
    const foundedExpenses = expenses.filter(
      (expense) => expense.spentAt > from && expense.spentAt <= to
    );

    res.statusCode = 200;
    res.send(foundedExpenses);
  }

  res.sendStatus(400);
};

const getExpense = (req, res) => {
  const { expenseId } = req.params;

  if (isNaN(+expenseId)) {
    res.sendStatus(400);

    return;
  }

  const foundexpense = expenses.find((expense) => expense.id === +expenseId);

  if (!foundexpense) {
    res.sendStatus(404);

    return;
  }

  res.send(foundexpense);
};

const postExpense = (req, res) => {
  res.setHeader('Content-Type', 'application/json');

  if (!req.body) {
    res.sendStatus(400);

    return;
  }

  const { userId, spentAt, title, amount, category, note } = req.body;

  const foundUser = users.find((user) => user.id === +userId);

  if (!foundUser) {
    res.sendStatus(400);

    return;
  }

  const newExpense = {
    id: expenses.length,
    userId: +userId,
    spentAt,
    title,
    amount: +amount,
    category,
    note,
  };

  expenses.push(newExpense);

  res.statusCode = 201;
  res.send(newExpense);
};

const patchExpense = (req, res) => {
  res.setHeader('Content-Type', 'application/json');

  const { expenseId } = req.params;

  if (isNaN(+expenseId)) {
    res.sendStatus(400);

    return;
  }

  const foundExpense = expenses.find((expense) => expense.id === +expenseId);

  if (!foundExpense) {
    res.sendStatus(404);

    return;
  }

  if (!req.body) {
    res.sendStatus(400);

    return;
  }

  const { title } = req.body;

  const newExpense = {
    ...foundExpense,
    title,
  };

  expenses = expenses.map((expense) =>
    expense.id === foundExpense.id ? newExpense : expense
  );

  res.statusCode = 200;
  res.send(newExpense);
};

const deleteExpense = (req, res) => {
  res.setHeader('Content-Type', 'application/json');

  const { expenseId } = req.params;

  if (isNaN(+expenseId)) {
    res.sendStatus(400);

    return;
  }

  const foundExpense = expenses.find((expense) => expense.id === +expenseId);

  if (!foundExpense) {
    res.sendStatus(404);

    return;
  }

  expenses = expenses.filter((expense) => expense.id !== foundExpense.id);
  res.sendStatus(204);
};

module.exports = {
  expenses,
  reset,
  getAllExpenses,
  getExpense,
  postExpense,
  patchExpense,
  deleteExpense,
};
