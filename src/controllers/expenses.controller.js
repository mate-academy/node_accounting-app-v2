'use strict';

const {
  getAllExpenses,
  getExpenseById,
  createExpense,
  deleteExpense,
  updateExpense,
} = require('../servises/expenses.servise');
const { getUserById } = require('../servises/users.servise');

const getExpensesResponse = (req, res) => {
  const { from, to, categories } = req.query;
  let visibleExpenses = getAllExpenses();

  if (from && to) {
    const start = new Date(from).getTime();
    const end = new Date(to).getTime();

    visibleExpenses = visibleExpenses.filter(exp => {
      const currExpensesDate = new Date(exp.spentAt).getTime();

      return currExpensesDate >= start && currExpensesDate <= end;
    });
  }

  if (categories) {
    visibleExpenses = visibleExpenses
      .filter(exp => exp.category === categories);
  }

  res.send(visibleExpenses);
};

const getExpenseResponse = (req, res) => {
  const { id } = req.params;

  const expense = getExpenseById(+id);

  if (!expense) {
    res.sendStatus(404);

    return;
  }

  res.send(expense);
};

const createExpenseResponse = (req, res) => {
  const {
    userId,
    spentAt,
    title,
    amount,
    category,
    note,
  } = req.body;

  const currentUser = getUserById(userId);

  if (!currentUser) {
    return res.sendStatus(400);
  }

  if (!userId
     || !spentAt
     || !title
     || !amount
     || !category
     || !note) {
    const newExpense = createExpense(userId,
      spentAt,
      title,
      amount,
      category,
      note);

    res.status(201).send(newExpense);
  } else {
    res.sendStatus(404);
  }
};

const deleteExpenseResponse = (req, res) => {
  const { id } = req.params;

  if (!getExpenseById(id)) {
    return res.sendStatus(404);
  }

  deleteExpense(+id);

  return res.sendStatus(204);
};

const updateExpenseResponse = (req, res) => {
  const { id } = req.params;
  const {
    userId,
    spentAt,
    title,
    amount,
    category,
    note,
  } = req.body;

  const foundExpense = getExpenseById(+id);

  if (!foundExpense) {
    res.sendStatus(404);

    return;
  }

  const updatedExpense = updateExpense(+id,
    userId,
    spentAt,
    title,
    amount,
    category,
    note,
  );

  return res.send(updatedExpense);
};

module.exports = {
  getExpensesResponse,
  getExpenseResponse,
  createExpenseResponse,
  deleteExpenseResponse,
  updateExpenseResponse,
};
