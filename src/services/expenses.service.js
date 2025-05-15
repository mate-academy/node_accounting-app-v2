const express = require('express');
const router = express.Router();
const { v4: uuidv4 } = require('uuid');
const { getUserById } = require('./users.service');

const generateUniqNumberId = () => {
  const uuid = uuidv4()
    .replace(/[^0-9]/g, '')
    .slice(0, 5);

  return Number(uuid);
};

let expenses = [];

const initExpenses = () => {
  expenses = [];
};

router.get('/', (req, res) => {
  const { userId, from, to, categories, category } = req.query;
  let filteredExpenses = expenses;

  if (userId) {
    filteredExpenses = filteredExpenses.filter(
      (e) => Number(e.userId) === Number(userId),
    );
  }

  if (from) {
    const fromDate = new Date(from);

    filteredExpenses = filteredExpenses.filter(
      (e) => new Date(e.spentAt) >= fromDate,
    );
  }

  if (to) {
    const toDate = new Date(to);

    filteredExpenses = filteredExpenses.filter(
      (e) => new Date(e.spentAt) <= toDate,
    );
  }

  if (category) {
    filteredExpenses = filteredExpenses.filter((e) => e.category === category);
  } else if (categories) {
    const categoryArray = categories.split(',');

    filteredExpenses = filteredExpenses.filter((e) => {
      return categoryArray.includes(e.category);
    });
  }
  res.status(200).json(filteredExpenses);
});

router.post('/', (req, res) => {
  const { userId, spentAt, title, amount, category, note } = req.body;

  const userExists = getUserById(userId);

  if (!title || !userExists) {
    return res.sendStatus(400);
  }

  const newExpense = {
    id: generateUniqNumberId(),
    userId,
    spentAt,
    title,
    amount,
    category,
    note,
  };

  expenses.push(newExpense);
  res.status(201).json(newExpense);
});

router.get('/:id', (req, res) => {
  const { id } = req.params;
  const expense = expenses.find((e) => Number(e.id) === Number(id));

  if (!expense) {
    return res.sendStatus(404);
  }
  res.status(200).json(expense);
});

router.patch('/:id', (req, res) => {
  const { id } = req.params;
  const expenseIndex = expenses.findIndex((e) => Number(e.id) === Number(id));

  if (expenseIndex === -1) {
    return res.sendStatus(404);
  }

  const { spentAt, title, amount, category, note } = req.body;

  expenses[expenseIndex] = {
    ...expenses[expenseIndex],
    ...(spentAt !== undefined && { spentAt }),
    ...(title !== undefined && { title }),
    ...(amount !== undefined && { amount }),
    ...(category !== undefined && { category }),
    ...(note !== undefined && { note }),
  };
  res.status(200).json(expenses[expenseIndex]);
});

router.delete('/:id', (req, res) => {
  const { id } = req.params;
  const expenseIndex = expenses.findIndex((e) => Number(e.id) === Number(id));

  if (expenseIndex === -1) {
    return res.sendStatus(404);
  }
  expenses.splice(expenseIndex, 1);
  res.sendStatus(204);
});

module.exports = { router, expenses, initExpenses };
