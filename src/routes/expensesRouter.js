/* eslint-disable function-paren-newline */
const { Router } = require('express');
const { mockUsers } = require('./usersRouter.js');
const expensesRouter = Router();
const mockExpenses = new Map();

const filterFunctions = {
  userId: (expenses, userId) =>
    expenses.filter((expense) => expense.userId === Number(userId)),
  categories: (expenses, categories) => {
    const categoryList = categories
      .split(',')
      .map((category) => category.trim());

    return expenses.filter((expense) =>
      categoryList.includes(expense.category),
    );
  },
  dateRange: (expenses, from, to) =>
    expenses.filter((expense) => {
      const expenseDate = new Date(expense.spentAt);
      const startDate = new Date(from);
      const endDate = new Date(to);

      return expenseDate >= startDate && expenseDate <= endDate;
    }),
};

expensesRouter.get('/', (req, res) => {
  const { userId, from, to, categories } = req.query;

  let filteredExpenses = [...mockExpenses.values()];

  if (userId) {
    filteredExpenses = filterFunctions.userId(filteredExpenses, userId);
  }

  if (categories) {
    filteredExpenses = filterFunctions.categories(filteredExpenses, categories);
  }

  if (from && to) {
    filteredExpenses = filterFunctions.dateRange(filteredExpenses, from, to);
  }

  res.status(200).send(filteredExpenses);
});

expensesRouter.post('/', (req, res) => {
  const { userId, spentAt, title, amount, category, note } = req.body;

  if (!userId || isNaN(Number(userId))) {
    return res.status(400).send('Valid UserId is required!');
  }

  const user = mockUsers.get(Number(userId));

  if (!user) {
    return res.status(400).send('User not found!');
  }

  const maxId = Math.max(...mockExpenses.keys(), 0);
  const newId = maxId + 1;

  const newExpense = {
    id: newId,
    userId: Number(userId),
    spentAt,
    title,
    amount,
    category,
    note,
  };

  mockExpenses.set(newId, newExpense);

  res.status(201).send(newExpense);
});

expensesRouter.get('/:id', (req, res) => {
  const { id } = req.params;

  if (!mockExpenses.has(Number(id))) {
    return res.sendStatus(404);
  }

  res.status(200).send(mockExpenses.get(Number(id)));
});

expensesRouter.delete('/:id', (req, res) => {
  const { id } = req.params;

  if (!id || isNaN(Number(id))) {
    return res.sendStatus(400);
  }

  if (!mockExpenses.has(Number(id))) {
    return res.sendStatus(404);
  }

  mockExpenses.delete(Number(id));
  res.sendStatus(204);
});

expensesRouter.patch('/:id', (req, res) => {
  const { id } = req.params;
  const { title, amount, category, note } = req.body;

  if (!mockExpenses.has(Number(id))) {
    return res.sendStatus(404);
  }

  const expenseToUpdate = mockExpenses.get(Number(id));

  expenseToUpdate.title = title ?? expenseToUpdate.title;
  expenseToUpdate.amount = amount ?? expenseToUpdate.amount;
  expenseToUpdate.category = category ?? expenseToUpdate.category;
  expenseToUpdate.note = note ?? expenseToUpdate.note;

  res.status(200).send(expenseToUpdate);
});

const resetMockExpenses = () => {
  mockExpenses.clear();
};

module.exports = { expensesRouter, resetMockExpenses };
