/* eslint-disable no-console */
/* eslint-disable no-useless-return */
const expenseService = require('../services/expenseService');
const userService = require('../services/userService');

const getExpenses = (req, res) => {
  try {
    const { userId, categories, from, to } = req.query;

    let expensesResult = expenseService.getAllExpense();

    if (userId) {
      expensesResult = expensesResult.filter(
        (expense) => expense.userId === +userId,
      );
    }

    if (categories) {
      expensesResult = expensesResult.filter(
        (expense) => expense.category === categories,
      );
    }

    if (from && to) {
      expensesResult = expensesResult.filter(
        (expense) =>
          new Date(from) < new Date(expense.spentAt) &&
          new Date(to) > new Date(expense.spentAt),
      );
    }

    res.status(200).send(expensesResult);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const getOneExpense = (req, res) => {
  const { id } = req.params;
  const expense = expenseService.getExpensesById(id);

  if (!expense) {
    res.sendStatus(404);

    return;
  }

  res.status(200).json(expense);
};

const createExpense = (req, res) => {
  const { userId, spentAt, category, title, amount, note } = req.body;

  if (!userId || !spentAt || !category || !title || !amount || !note) {
    res.sendStatus(400);

    return;
  }

  if (!userService.getUserById(userId)) {
    res.sendStatus(400);

    return;
  }

  const expense = expenseService.createExpense(
    userId,
    spentAt,
    title,
    amount,
    category,
    note,
  );

  res.status(201).json(expense);
};

const updateExpense = (req, res) => {
  const { id } = req.params;

  if (!expenseService.getExpensesById(id)) {
    res.sendStatus(404);

    return;
  }

  const newExpense = expenseService.updateExpense(id, req.body);

  if (!newExpense) {
    res.sendStatus(404);

    return;
  }

  res.status(200).json(newExpense);
};

const deletExpense = (req, res) => {
  const { id } = req.params;

  if (!expenseService.getExpensesById(id)) {
    res.sendStatus(404);

    return;
  }

  expenseService.removeExpense(id);

  res.sendStatus(204);
};

module.exports = {
  getExpenses,
  getOneExpense,
  createExpense,
  updateExpense,
  deletExpense,
};
