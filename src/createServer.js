const express = require('express');

function createServer() {
  const app = express();

  app.use(express.json());

  const users = [];
  const expenses = [];

  let nextUserId = 1;
  let nextExpenseId = 1;

  app.get('/users', (req, res) => {
    res.json(users);
  });

  app.get('/users/:id', (req, res) => {
    const id = Number(req.params.id);
    const user = users.find((u) => u.id === id);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json(user);
  });

  app.post('/users', (req, res) => {
    const { name } = req.body;

    if (!name) {
      return res.status(400).json({ message: 'Name is required' });
    }

    const newUser = {
      id: nextUserId++,
      name,
    };

    users.push(newUser);
    res.status(201).json(newUser);
  });

  app.patch('/users/:id', (req, res) => {
    const id = Number(req.params.id);
    const user = users.find((u) => u.id === id);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const { name } = req.body;

    if (name !== undefined) {
      user.name = name;
    }

    res.json(user);
  });

  app.delete('/users/:id', (req, res) => {
    const id = Number(req.params.id);
    const index = users.findIndex((u) => u.id === id);

    if (index === -1) {
      return res.status(404).json({ message: 'User not found' });
    }

    users.splice(index, 1);
    res.sendStatus(204);
  });

  app.get('/expenses', (req, res) => {
    const { userId, category, categories, from, to } = req.query;

    let result = [...expenses];

    if (userId !== undefined) {
      const uId = Number(userId);
      const userExists = users.some((u) => u.id === uId);

      if (!userExists) {
        return res.status(400).json({ message: 'User not found' });
      }

      result = result.filter((e) => e.userId === uId);
    }

    const targetCategory = category || categories;

    if (targetCategory) {
      const categoryList = Array.isArray(targetCategory)
        ? targetCategory.map((c) => String(c).toLowerCase())
        : [String(targetCategory).toLowerCase()];

      result = result.filter((e) => {
        return categoryList.includes(e.category.toLowerCase());
      });
    }

    if (from) {
      result = result.filter((e) => new Date(e.spentAt) >= new Date(from));
    }

    if (to) {
      result = result.filter((e) => new Date(e.spentAt) <= new Date(to));
    }

    res.json(result);
  });

  app.get('/expenses/:id', (req, res) => {
    const id = Number(req.params.id);
    const expense = expenses.find((e) => e.id === id);

    if (!expense) {
      return res.status(404).json({ message: 'Expense not found' });
    }

    res.json(expense);
  });

  app.post('/expenses', (req, res) => {
    const { userId, title, amount, category, note, spentAt } = req.body;

    if (
      userId === undefined ||
      !title ||
      amount === undefined ||
      !category ||
      !spentAt
    ) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    const userExists = users.some((u) => u.id === Number(userId));

    if (!userExists) {
      return res.status(400).json({ message: 'User not found' });
    }

    const newExpense = {
      id: nextExpenseId++,
      userId: Number(userId),
      title,
      amount,
      category,
      note: note || '',
      spentAt,
    };

    expenses.push(newExpense);
    res.status(201).json(newExpense);
  });

  app.patch('/expenses/:id', (req, res) => {
    const id = Number(req.params.id);
    const expense = expenses.find((e) => e.id === id);

    if (!expense) {
      return res.status(404).json({ message: 'Expense not found' });
    }

    const { userId, title, amount, category, note, spentAt } = req.body;

    if (userId !== undefined) {
      const userExists = users.some((u) => u.id === Number(userId));

      if (!userExists) {
        return res.status(400).json({ message: 'User not found' });
      }
      expense.userId = Number(userId);
    }

    if (title !== undefined) {
      expense.title = title;
    }

    if (amount !== undefined) {
      expense.amount = amount;
    }

    if (category !== undefined) {
      expense.category = category;
    }

    if (note !== undefined) {
      expense.note = note;
    }

    if (spentAt !== undefined) {
      expense.spentAt = spentAt;
    }

    res.json(expense);
  });

  app.delete('/expenses/:id', (req, res) => {
    const id = Number(req.params.id);
    const index = expenses.findIndex((e) => e.id === id);

    if (index === -1) {
      return res.status(404).json({ message: 'Expense not found' });
    }

    expenses.splice(index, 1);
    res.sendStatus(204);
  });

  return app;
}

module.exports = {
  createServer,
};
