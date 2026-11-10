'use strict';

const express = require('express');

function createServer() {
  const app = express();

  // Додаємо middleware для парсингу JSON тіла запиту
  app.use(express.json());

  const users = [];
  const expenses = [];
  let nextUserId = 1;
  let nextExpenseId = 1;

  // ============================
  // USERS ENDPOINTS
  // ============================

  app.post('/users', (req, res) => {
    const { name } = req.body;

    if (!name) {
      return res.status(400).json({ error: 'Name is required' });
    }

    const newUser = { id: nextUserId++, name };

    users.push(newUser);

    res.status(201).json(newUser);
  });

  app.get('/users', (req, res) => {
    res.status(200).json(users);
  });

  app.get('/users/:id', (req, res) => {
    const id = parseInt(req.params.id, 10);
    const user = users.find((u) => u.id === id);

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.status(200).json(user);
  });

  // Функція для оновлення (перевикористовується для PATCH і PUT)
  const updateUser = (req, res) => {
    const id = parseInt(req.params.id, 10);
    const user = users.find((u) => u.id === id);

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    if (req.body.name !== undefined) {
      user.name = req.body.name;
    }

    res.status(200).json(user);
  };

  app.patch('/users/:id', updateUser);
  app.put('/users/:id', updateUser);

  app.delete('/users/:id', (req, res) => {
    const id = parseInt(req.params.id, 10);
    const userIndex = users.findIndex((u) => u.id === id);

    if (userIndex === -1) {
      return res.status(404).json({ error: 'User not found' });
    }

    users.splice(userIndex, 1);
    res.status(204).send();
  });

  // ============================
  // EXPENSES ENDPOINTS
  // ============================

  app.post('/expenses', (req, res) => {
    const { userId, spentAt, title, amount, category, note } = req.body;

    // Валідація: якщо тіло порожнє або немає userId
    if (!userId) {
      return res.status(400).json({ error: 'Missing required parameters' });
    }

    // Валідація: перевіряємо, чи існує користувач
    const userExists = users.find((u) => u.id === userId);

    if (!userExists) {
      return res.status(400).json({ error: 'User not found' });
    }

    const newExpense = {
      id: nextExpenseId++,
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

  app.get('/expenses', (req, res) => {
    let result = [...expenses];
    const { userId, from, to, categories } = req.query;

    if (userId) {
      result = result.filter((e) => e.userId === parseInt(userId, 10));
    }

    if (from) {
      const fromDate = new Date(from);

      result = result.filter((e) => new Date(e.spentAt) >= fromDate);
    }

    if (to) {
      const toDate = new Date(to);

      result = result.filter((e) => new Date(e.spentAt) <= toDate);
    }

    if (categories) {
      // Підтримка категорій через кому (напр. categories=Electronics,Food)
      const cats = categories.split(',');

      result = result.filter((e) => cats.includes(e.category));
    }

    res.status(200).json(result);
  });

  app.get('/expenses/:id', (req, res) => {
    const id = parseInt(req.params.id, 10);
    const expense = expenses.find((e) => e.id === id);

    if (!expense) {
      return res.status(404).json({ error: 'Expense not found' });
    }

    res.status(200).json(expense);
  });

  const updateExpense = (req, res) => {
    const id = parseInt(req.params.id, 10);
    const expense = expenses.find((e) => e.id === id);

    if (!expense) {
      return res.status(404).json({ error: 'Expense not found' });
    }

    const { userId, spentAt, title, amount, category, note } = req.body;

    // Оновлюємо тільки ті поля, які були передані
    if (userId !== undefined) {
      expense.userId = userId;
    }

    if (spentAt !== undefined) {
      expense.spentAt = spentAt;
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

    res.status(200).json(expense);
  };

  app.patch('/expenses/:id', updateExpense);
  app.put('/expenses/:id', updateExpense);

  app.delete('/expenses/:id', (req, res) => {
    const id = parseInt(req.params.id, 10);
    const index = expenses.findIndex((e) => e.id === id);

    if (index === -1) {
      return res.status(404).json({ error: 'Expense not found' });
    }

    expenses.splice(index, 1);
    res.status(204).send();
  });

  // Повертаємо налаштований екземпляр Express-додатку
  return app;
}

module.exports = {
  createServer,
};
