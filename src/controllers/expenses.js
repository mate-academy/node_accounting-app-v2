'use strict';

const { userExist } = require('./users');

let expenses = [];

const initialExpenses = () => (
  expenses = []
);

const getAllExpanses = (req, res) => {
  const { category, from, to, userId } = req.query;

  let filteredExpenses = expenses;

  if (from && to) {
    filteredExpenses = filteredExpenses.filter(expense =>
      expense.spentAt >= from
      && expense.spentAt <= to);
  }

  if (userId) {
    filteredExpenses = filteredExpenses.filter(expense =>
      expense.userId === +userId);
  }

  if (category) {
    filteredExpenses = filteredExpenses.filter(expense =>
      expense.category === category);
  }

  res.statusCode = 200;
  res.send(filteredExpenses);
};

const createNewExpanse = (req, res) => {
  const { userId, spentAt, title, amount, category, note } = req.body;

  const isUserExist = userExist(userId);

  const isValidData = !title || !spentAt || !amount
  || !category || !note || !isUserExist;

  if (isValidData) {
    res.sendStatus(400);

    return;
  }

  const maxId = expenses.length
    ? Math.max(...expenses.map(el => el.id))
    : 0;

  const isValidTypeData = !(
    typeof userId !== 'number'
    || typeof title !== 'string'
    || typeof amount !== 'number'
    || typeof spentAt !== 'string'
    || typeof category !== 'string'
    || typeof note !== 'string'
  );

  if (!isValidTypeData) {
    res.sendStatus(422);

    return;
  }

  const newExpense = {
    id: maxId + 1,
    userId,
    title,
    amount,
    spentAt,
    category,
    note,
  };

  expenses.push(newExpense);

  res.statusCode = 201;
  res.send(newExpense);
};

const getExpenseById = (req, res) => {
  const { expenseId } = req.params;

  const foundUserExpens = expenses.find(expense => expense.id === +expenseId);

  if (!foundUserExpens) {
    res.sendStatus(404);

    return;
  }

  res.statusCode = 200;
  res.send(foundUserExpens);
};

const changeExpanseFiled = (req, res) => {
  const { expenseId } = req.params;

  const foundExpense = expenses.find(expense => expense.id === +expenseId);

  if (!foundExpense) {
    res.sendStatus(404);

    return;
  }

  const { filed, title } = req.body;

  Object.assign(foundExpense, {
    ...filed, title,
  });

  res.statusCode = 200;
  res.send(foundExpense);
};

const deleteExpense = (req, res) => {
  const { expenseId } = req.params;

  const filteredExpenses = expenses.filter(expense =>
    expense.id !== +expenseId);

  if (filteredExpenses.length === expenses.length) {
    res.sendStatus(404);

    return;
  }

  expenses = filteredExpenses;
  res.sendStatus(204);
};

module.exports = {
  getAllExpanses,
  createNewExpanse,
  getExpenseById,
  changeExpanseFiled,
  deleteExpense,
  initialExpenses,
};
