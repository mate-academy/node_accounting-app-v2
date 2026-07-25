const express = require('express');

function createExpenseRouter(users, expenses) {
  const router = express.Router();
  let nextExpenseId = 1;

  router.get('/', (req, res) => {
    let result = [...expenses];

    const { userId, categories, category, from, to } = req.query;

    if (userId !== undefined) {
      result = result.filter((exp) => String(exp.userId) === String(userId));
    }

    const categoryFilter = categories || category;

    if (categoryFilter) {
      const categoryList = Array.isArray(categoryFilter)
        ? categoryFilter
        : categoryFilter.split(',').map((c) => c.trim());

      result = result.filter((exp) => categoryList.includes(exp.category));
    }

    if (from) {
      const fromDate = new Date(from);

      result = result.filter((exp) => new Date(exp.spentAt) >= fromDate);
    }

    if (to) {
      const toDate = new Date(to);

      result = result.filter((exp) => new Date(exp.spentAt) <= toDate);
    }

    res.status(200).json(result);
  });

  router.post('/', (req, res) => {
    const { userId, title, amount, category, spentAt, note } = req.body;

    if (!userId || !title || amount === undefined) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    const userExists = users.some((user) => String(user.id) === String(userId));

    if (!userExists) {
      return res.status(400).json({ error: 'User not found' });
    }

    const newExpense = {
      id: nextExpenseId++,
      userId,
      title,
      amount,
      category: category || 'Uncategorized',
      spentAt: spentAt || new Date().toISOString(),
    };

    if (note !== undefined) {
      newExpense.note = note;
    }

    expenses.push(newExpense);
    res.status(201).json(newExpense);
  });

  router.get('/:id', (req, res) => {
    const paramId = req.params.id;
    const expense = expenses.find((e) => String(e.id) === String(paramId));

    if (!expense) {
      return res.status(404).json({ error: 'Expense not found' });
    }

    res.status(200).json(expense);
  });

  router.patch('/:id', (req, res) => {
    const paramId = req.params.id;
    const expense = expenses.find((e) => String(e.id) === String(paramId));

    if (!expense) {
      return res.status(404).json({ error: 'Expense not found' });
    }

    const { title, amount, category, spentAt, note } = req.body;

    if (title !== undefined) {
      expense.title = title;
    }

    if (amount !== undefined) {
      expense.amount = amount;
    }

    if (category !== undefined) {
      expense.category = category;
    }

    if (spentAt !== undefined) {
      expense.spentAt = spentAt;
    }

    if (note !== undefined) {
      expense.note = note;
    }

    res.status(200).json(expense);
  });

  router.delete('/:id', (req, res) => {
    const paramId = req.params.id;
    const index = expenses.findIndex((e) => String(e.id) === String(paramId));

    if (index === -1) {
      return res.status(404).json({ error: 'Expense not found' });
    }

    expenses.splice(index, 1);
    res.status(204).send();
  });

  return router;
}

module.exports = createExpenseRouter;
