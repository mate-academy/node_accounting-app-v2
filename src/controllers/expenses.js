/* eslint-disable space-before-function-paren */
/* eslint-disable no-console */
'use strict';

const z = require('zod');

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
  const category = req.query.category || null;

  if (userId && isNaN(+userId)) {
    res.status(400).send('Invalid userId');

    return;
  }

  try {
    const expenses = await getExpenses(+userId, from, to, category);

    res.send(expenses);
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
};

const getExpenseByIdController = async (req, res) => {
  const { id } = req.params;

  if (!id || isNaN(+id)) {
    res.status(400).send('Invalid id');

    return;
  }

  try {
    const expense = await getExpenseById(+id);

    if (!expense) {
      return res.status(404).send('Expense not found');
    }

    res.send(expense);
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
};

const addExpenseController = async (req, res) => {
  const { userId, title, amount, category, note, spentAt } = req.body;

  const isUserIdValid = z.number().safeParse(userId);
  const isTitleValid = z.string().min(1).safeParse(title);
  const isAmountValid = z.number().safeParse(amount);
  const isCategoryValid = z.string().min(1).safeParse(category);
  const isNoteValid = z.string().min(1).safeParse(note);
  const isspentAtValid = z.string().datetime().safeParse(spentAt);

  if (
    /* prettier-ignore */
    !isUserIdValid
    || !isTitleValid
    || !isAmountValid
    || !isCategoryValid
    || !isNoteValid
    || !isspentAtValid
  ) {
    res.status(400).send('Invalid data');

    return;
  }

  try {
    const user = await getUserById(userId);

    if (!user) {
      return res.status(400).send('User not found');
    }

    const expense = await addExpense({
      userId,
      title,
      amount,
      category,
      note,
      spentAt,
    });

    if (!expense) {
      res.sendStatus(500);
    }

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
    res.status(400).send('Invalid id');
  }

  try {
    const expense = await getExpenseById(+id);

    if (!expense) {
      return res.status(404).send('Expense not found');
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
  const { spentAt, title, amount, category, note } = req.body;

  if (!id || !spentAt || !title || !amount || !category || !note) {
    res.status(400).send('Invalid data');
  }

  try {
    const expense = await getExpenseById(+id);

    if (!expense) {
      return res.status(404).send('Expense not found');
    }

    const updatedExpense = await updateExpense(
      +id,
      spentAt,
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
