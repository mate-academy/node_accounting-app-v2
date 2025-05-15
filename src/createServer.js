'use strict';

const express = require('express');

function createServer() {
  let nextUser = 1;
  const expenses = [];

  const users = [];

  const app = express();
  const router = express.Router();

  router.get('/expenses', (req, res) => {
    const { userId, from, to, categories } = req.query;

    let filteredExpenses = expenses;

    if (userId) {
      filteredExpenses = filteredExpenses.filter(
        (expense) => expense.userId === Number(userId),
      );
    }

    if (from && to) {
      const fromDate = new Date(from);
      const toDate = new Date(to);

      filteredExpenses = filteredExpenses.filter((expense) => {
        const spentAt = new Date(expense.spentAt);

        return spentAt >= fromDate && spentAt <= toDate;
      });
    }

    if (categories) {
      filteredExpenses = filteredExpenses.filter(
        (expense) => expense.category === categories,
      );
    }

    return res.status(200).json(filteredExpenses);
  });

  router.get('/expenses/:id', (req, res) => {
    const { id } = req.params;
    const expenseId = Number(id);

    if (isNaN(expenseId)) {
      return res.status(400).json({ error: 'ID inválido' });
    }

    const expense = expenses.find((exp) => exp.id === expenseId);

    if (!expense) {
      return res.status(404).json({ error: 'Item não encontrado' });
    }

    return res.status(200).json(expense);
  });

  router.post('/expenses', (req, res) => {
    const { title, amount, category, note, spentAt, userId } = req.body;

    if (!title || !amount || !category || !note || !spentAt || !userId) {
      return res.status(400).json({
        error: 'Valores invalidos ou faltando',
      });
    }

    const userExists = users.some((user) => user.id === userId);

    if (!userExists) {
      return res.status(400).json({ error: 'Usuário não encontrado' });
    }

    const newExpense = {
      id: expenses.length + 1,
      title,
      amount,
      category,
      note,
      spentAt,
      userId,
    };

    expenses.push(newExpense);

    res.status(201).json(newExpense);
  });

  router.patch('/expenses/:id', (req, res) => {
    const { id } = req.params;
    const expenseId = Number(id);

    const expenseIndex = expenses.findIndex((exp) => exp.id === expenseId);

    if (expenseIndex === -1) {
      return res.status(404).json({ error: 'Expense not found' });
    }

    const updateData = req.body;

    if (Object.keys(updateData).length === 0) {
      return res.status(400).json({ error: 'No data provided to update' });
    }

    expenses[expenseIndex] = { ...expenses[expenseIndex], ...updateData };

    return res.status(200).json(expenses[expenseIndex]);
  });

  router.delete('/expenses/:id', (req, res) => {
    const { id } = req.params;
    const expenseId = Number(id);

    const index = expenses.findIndex((exp) => exp.id === expenseId);

    if (index === -1) {
      return res.status(404).json({
        error: 'Item nao encontrado',
      });
    }

    expenses.splice(index, 1);

    return res.status(204).send();
  });

  // routes de users

  router.get('/users', (req, res) => {
    res.status(200).json(users);
  });

  router.get('/users/:id', (req, res) => {
    const { id } = req.params;
    const userId = Number(id);

    if (isNaN(userId)) {
      return res.status(400).json({ error: 'ID inválido' });
    }

    const user = users.find((cat) => cat.id === userId);

    if (!user) {
      return res.status(404).json({ error: 'Item não encontrado' });
    }

    return res.status(200).json(user);
  });

  router.post('/users', (req, res) => {
    const { name } = req.body;

    if (!name) {
      return res.status(400).json({
        error: 'nome é obrigatorio',
      });
    }

    const newCategory = { id: nextUser++, name };

    users.push(newCategory);

    res.status(201).json(newCategory);
  });

  router.patch('/users/:id', (req, res) => {
    const { id } = req.params;
    const { name } = req.body;
    const userId = Number(id);

    if (isNaN(userId)) {
      return res.status(400).json({ error: 'ID inválido' });
    }

    const user = users.find((cat) => cat.id === userId);

    if (user === undefined) {
      return res.status(404).json({
        error: 'Item nao encontrado',
      });
    }

    if (!name) {
      return res.status(400).json({
        error: 'Nenhum campo para atualizar foi enviado',
      });
    }

    if (name !== undefined) {
      user.name = name;
    }

    return res.status(200).json(user);
  });

  router.delete('/users/:id', (req, res) => {
    const { id } = req.params;
    const userId = Number(id);

    const user = users.findIndex((cat) => cat.id === userId);

    if (user === -1) {
      return res.status(404).json({
        error: 'Item nao encontrado',
      });
    }

    users.splice(user, 1);

    return res.status(204).send();
  });

  app.use(express.json());
  app.use('/', router);

  return app;
  // Use express to create a server
  // Add a routes to the server
  // Return the server (express app)
}

module.exports = {
  createServer,
};
