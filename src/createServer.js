'use strict';

const express = require('express');

function createServer() {
  const app = express();

  app.use(express.json()); // Для обробки JSON-тіл запитів

  // Зберігання даних у пам’яті
  const expenses = [];
  const users = [];

  // Лічильники для генерації id
  let expenseIdCounter = 0;
  let userIdCounter = 0;

  // Middleware для обробки помилок 400 (відсутність параметрів)
  const checkRequiredFields = (requiredFields) => (req, res, next) => {
    const missingFields = requiredFields.filter((field) => !req.body[field]);

    if (missingFields.length > 0) {
      return res.status(400).json({
        error: `Missing required fields: ${missingFields.join(', ')}`,
      });
    }
    next();
  };

  // Перевірка існування користувача за ID
  const checkUserExists = (req, res, next) => {
    if (req.body.userId) {
      const user = users.find((u) => u.id === Number(req.body.userId));

      if (!user) {
        return res.status(400).json({ error: 'User not found' });
      }
    }
    next();
  };

  // Ендпоінти для expenses
  // GET /expenses - повертає список усіх витрат
  app.get('/expenses', (req, res) => {
    let filteredExpenses = [...expenses];

    // Фільтрація за userId
    if (req.query.userId) {
      filteredExpenses = filteredExpenses.filter(
        (e) => e.userId === Number(req.query.userId),
      );
    }

    // Фільтрація за датами
    if (req.query.from && req.query.to) {
      filteredExpenses = filteredExpenses.filter((e) => {
        const expenseDate = new Date(e.spentAt);

        return (
          expenseDate >= new Date(req.query.from) &&
          expenseDate <= new Date(req.query.to)
        );
      });
    }

    // Фільтрація за категорією
    if (req.query.categories) {
      filteredExpenses = filteredExpenses.filter(
        (e) => e.category === req.query.categories,
      );
    }

    res.json(filteredExpenses);
  });

  // GET /expenses/:id - повертає витрату за ID
  app.get('/expenses/:id', (req, res) => {
    const expense = expenses.find((e) => e.id === Number(req.params.id));

    if (!expense) {
      return res.status(404).json({ error: 'Expense not found' });
    }
    res.json(expense);
  });

  // POST /expenses - створює нову витрату
  app.post(
    '/expenses',
    checkRequiredFields(['title', 'amount', 'spentAt']),
    checkUserExists,
    (req, res) => {
      const { title, amount, spentAt, category, note, userId, id } = req.body;
      const newExpense = {
        id: id ? Number(id) : ++expenseIdCounter,
        title,
        amount: parseFloat(amount),
        spentAt,
        category,
        note,
        userId: userId ? Number(userId) : undefined,
      };

      expenses.push(newExpense);
      res.status(201).json(newExpense);
    },
  );

  // PATCH /expenses/:id - часткове оновлення витрати
  app.patch('/expenses/:id', (req, res) => {
    const { title, amount, spentAt, category, note, userId } = req.body;
    const expenseIndex = expenses.findIndex(
      (e) => e.id === Number(req.params.id),
    );

    if (expenseIndex === -1) {
      return res.status(404).json({ error: 'Expense not found' });
    }

    // Перевірка userId, якщо передано
    if (userId) {
      const user = users.find((u) => u.id === Number(userId));

      if (!user) {
        return res.status(400).json({ error: 'User not found' });
      }
    }

    expenses[expenseIndex] = {
      ...expenses[expenseIndex],
      ...(title && { title }),
      ...(amount && { amount: parseFloat(amount) }),
      ...(spentAt && { spentAt }),
      ...(category && { category }),
      ...(note && { note }),
      ...(userId && { userId: Number(userId) }),
    };
    res.status(200).json(expenses[expenseIndex]);
  });

  // PUT /expenses/:id - повне оновлення витрати
  app.put(
    '/expenses/:id',
    checkRequiredFields(['title', 'amount', 'spentAt']),
    checkUserExists,
    (req, res) => {
      const { title, amount, spentAt, category, note, userId } = req.body;
      const expenseIndex = expenses.findIndex(
        (e) => e.id === Number(req.params.id),
      );

      if (expenseIndex === -1) {
        return res.status(404).json({ error: 'Expense not found' });
      }

      expenses[expenseIndex] = {
        ...expenses[expenseIndex],
        title,
        amount: parseFloat(amount),
        spentAt,
        category,
        note,
        userId: userId ? Number(userId) : expenses[expenseIndex].userId,
      };
      res.json(expenses[expenseIndex]);
    },
  );

  // DELETE /expenses/:id - видаляє витрату за ID
  app.delete('/expenses/:id', (req, res) => {
    const expenseIndex = expenses.findIndex(
      (e) => e.id === Number(req.params.id),
    );

    if (expenseIndex === -1) {
      return res.status(404).json({ error: 'Expense not found' });
    }
    expenses.splice(expenseIndex, 1);
    res.status(204).send();
  });

  // Ендпоінти для users
  // GET /users - повертає список усіх користувачів
  app.get('/users', (req, res) => {
    res.json(users);
  });

  // GET /users/:id - повертає користувача за ID
  app.get('/users/:id', (req, res) => {
    const user = users.find((u) => u.id === Number(req.params.id));

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.json(user);
  });

  // POST /users - створює нового користувача
  app.post('/users', checkRequiredFields(['name']), (req, res) => {
    const { name, id } = req.body;
    const newUser = {
      id: id ? Number(id) : ++userIdCounter,
      name,
    };

    users.push(newUser);
    res.status(201).json(newUser);
  });

  // PATCH /users/:id - часткове оновлення користувача
  app.patch('/users/:id', (req, res) => {
    const { name } = req.body;
    const userIndex = users.findIndex((u) => u.id === Number(req.params.id));

    if (userIndex === -1) {
      return res.status(404).json({ error: 'User not found' });
    }

    if (!name) {
      return res.status(400).json({ error: 'Missing required fields: name' });
    }

    users[userIndex] = {
      ...users[userIndex],
      name,
    };
    res.status(200).json(users[userIndex]);
  });

  // PUT /users/:id - повне оновлення користувача
  app.put('/users/:id', checkRequiredFields(['name']), (req, res) => {
    const { name } = req.body;
    const userIndex = users.findIndex((u) => u.id === Number(req.params.id));

    if (userIndex === -1) {
      return res.status(404).json({ error: 'User not found' });
    }

    users[userIndex] = {
      ...users[userIndex],
      name,
    };
    res.json(users[userIndex]);
  });

  // DELETE /users/:id - видаляє користувача за ID
  app.delete('/users/:id', (req, res) => {
    const userIndex = users.findIndex((u) => u.id === Number(req.params.id));

    if (userIndex === -1) {
      return res.status(404).json({ error: 'User not found' });
    }
    users.splice(userIndex, 1);
    res.status(204).send();
  });

  // Повертаємо express app
  return app;
}

module.exports = {
  createServer,
};
