const express = require('express');

function createServer() {
  const app = express();

  app.use(express.json());

  // In-memory data store
  const users = [];
  const expenses = [];
  let userIdCounter = 1;
  let expenseIdCounter = 1;

  // ==========================================
  // USERS COLLECTION ENDPOINTS
  // ==========================================

  // 1. GET /users - Get all users
  app.get('/users', (req, res) => {
    res.json(users);
  });

  // 2. GET /users/:id - Get user by ID
  app.get('/users/:id', (req, res) => {
    const id = Number(req.params.id);
    const user = users.find((u) => u.id === id);

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.json(user);
  });

  // 3. POST /users - Create a new user
  app.post('/users', (req, res) => {
    const { name } = req.body;

    if (!name) {
      return res.status(400).json({ error: 'Name is required' });
    }

    const newUser = {
      id: userIdCounter++,
      name,
    };

    users.push(newUser);
    res.status(201).json(newUser);
  });

  // 4. PUT /users/:id - Update a user
  app.put('/users/:id', (req, res) => {
    const id = Number(req.params.id);
    const { name } = req.body;

    const userIndex = users.findIndex((u) => u.id === id);

    if (userIndex === -1) {
      return res.status(404).json({ error: 'User not found' });
    }

    if (!name) {
      return res.status(400).json({ error: 'Name is required' });
    }

    users[userIndex] = {
      ...users[userIndex],
      name,
    };

    res.json(users[userIndex]);
  });

  // 5. DELETE /users/:id - Delete a user
  app.delete('/users/:id', (req, res) => {
    const id = Number(req.params.id);
    const userIndex = users.findIndex((u) => u.id === id);

    if (userIndex === -1) {
      return res.status(404).json({ error: 'User not found' });
    }

    users.splice(userIndex, 1);
    res.status(204).send();
  });

  // ==========================================
  // EXPENSES COLLECTION ENDPOINTS
  // ==========================================

  // 1. GET /expenses - Get all expenses (with optional query filters)
  app.get('/expenses', (req, res) => {
    let result = [...expenses];
    const { userId, category, startDate, endDate } = req.query;

    if (userId !== undefined) {
      result = result.filter(
        (e) => e.userId === Number(userId) || e.userId === userId,
      );
    }

    if (category) {
      result = result.filter((e) => e.category === category);
    }

    if (startDate) {
      result = result.filter((e) => new Date(e.spentAt) >= new Date(startDate));
    }

    if (endDate) {
      result = result.filter((e) => new Date(e.spentAt) <= new Date(endDate));
    }

    res.json(result);
  });

  // 2. GET /expenses/:id - Get expense by ID
  app.get('/expenses/:id', (req, res) => {
    const id = Number(req.params.id);
    const expense = expenses.find((e) => e.id === id);

    if (!expense) {
      return res.status(404).json({ error: 'Expense not found' });
    }

    res.json(expense);
  });

  // 3. POST /expenses - Create a new expense
  app.post('/expenses', (req, res) => {
    const { title, amount, category, spentAt, note, userId } = req.body;

    if (!title || amount === undefined || !category || !spentAt) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    const newExpense = {
      id: expenseIdCounter++,
      title,
      amount,
      category,
      spentAt,
      note: note || '',
      userId: userId !== undefined ? Number(userId) : undefined,
    };

    expenses.push(newExpense);
    res.status(201).json(newExpense);
  });

  app.put('/expenses/:id', (req, res) => {
    const id = Number(req.params.id);
    const { title, amount, category, spentAt, note, userId } = req.body;

    const expenseIndex = expenses.findIndex((e) => e.id === id);

    if (expenseIndex === -1) {
      return res.status(404).json({ error: 'Expense not found' });
    }

    if (!title || amount === undefined || !category || !spentAt) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    expenses[expenseIndex] = {
      id,
      title,
      amount,
      category,
      spentAt,
      note: note || '',
      userId: userId !== undefined ? Number(userId) : undefined,
    };

    res.json(expenses[expenseIndex]);
  });

  // 5. DELETE /expenses/:id - Delete an expense
  app.delete('/expenses/:id', (req, res) => {
    const id = Number(req.params.id);
    const expenseIndex = expenses.findIndex((e) => e.id === id);

    if (expenseIndex === -1) {
      return res.status(404).json({ error: 'Not found' });
    }

    expenses.splice(expenseIndex, 1);
    res.status(204).send();
  });

  return app;
}

module.exports = {
  createServer,
};
