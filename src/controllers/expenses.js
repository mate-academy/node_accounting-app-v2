/* eslint-disable space-before-function-paren */
/* eslint-disable no-console */
'use strict';

const {
  getExpenses,
  getExpenseById,
  addExpense,
  removeExpense,
  updateExpense,
} = require('../services/expenses');

const { getUserById } = require('../services/users');

const getExpensesController = async (req, res) => {
  const userId = req.query.userId || null;
  const from = req.query.from || null;
  const to = req.query.to || null;

  if (userId && isNaN(+userId)) {
    res.sendStatus(400);

    return;
  }

  try {
    const expenses = await getExpenses(+userId, from, to);

    res.send(expenses);
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
};

const getExpenseByIdController = async (req, res) => {
  const { id } = req.params;

  if (!id || isNaN(+id)) {
    res.sendStatus(400);

    return;
  }

  try {
    const expense = await getExpenseById(+id);

    if (!expense) {
      return res.sendStatus(404);
    }

    res.send(expense);
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
};

const addExpenseController = async (req, res) => {
  const { userId, title, amount, category, note, spendAt } = req.body;

  if (!userId || !title || !amount || !category || !note || !spendAt) {
    res.sendStatus(400);

    return;
  }

  try {
    const user = await getUserById(+userId);

    if (!user) {
      return res.sendStatus(400);
    }

    const expense = await addExpense(
      userId,
      title,
      +amount,
      category,
      note,
      spendAt
    );

    res.status(201);
    res.send(expense);
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
};

const removeExpenseController = async (req, res) => {
  const { id } = req.params;

  if (!id) {
    res.sendStatus(400);
  }

  try {
    const expense = await getExpenseById(+id);

    if (!expense) {
      return res.sendStatus(404);
    }

    await removeExpense(+id);

    res.sendStatus(204);
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
};

const updateExpenseController = async (req, res) => {
  const { id } = req.params;
  const { spendAt, title, amount, category, note } = req.body;

  if (!id || !spendAt || !title || !amount || !category || !note) {
    res.sendStatus(400);
  }

  try {
    const expense = await getExpenseById(+id);

    if (!expense) {
      return res.sendStatus(404);
    }

    const updatedExpense = await updateExpense(
      +id,
      spendAt,
      title,
      +amount,
      category,
      note
    );

    res.send(updatedExpense);
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
};

module.exports = {
  getExpensesController,
  getExpenseByIdController,
  addExpenseController,
  removeExpenseController,
  updateExpenseController,
};
