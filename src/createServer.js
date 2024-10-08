'use strict';

// const { v4: uuidv4 } = require('uuid');
const express = require('express');

function createServer() {
  const app = express(); // ініціалізація серверу

  // масив users
  let users = [];

  // масив expenses
  let expenses = [];

  // Функція для отримання наступного порядкового номера для users
  const getNextUserId = () => {
    if (users.length === 0) {
      return 1;
    } // якщо немає користувачів, починати з 1

    // eslint-disable-next-line max-len
    return Math.max(...users.map((user) => user.id)) + 1; // знаходимо максимальний id і додаємо 1
  };

  // Функція для отримання наступного порядкового номера для expenses
  const getNextExpenseId = () => {
    if (expenses.length === 0) {
      return 1;
    } // якщо немає витрат, починати з 1

    // eslint-disable-next-line max-len
    return Math.max(...expenses.map((expense) => expense.id)) + 1; // знаходимо максимальний id і додаємо 1
  };

  // отримати всі users з масиву
  app.get('/users', (req, res) => {
    res.send(users);
  });

  // отримати конкретного user з масиву
  app.get('/users/:id', (req, res) => {
    const { id } = req.params;
    // eslint-disable-next-line max-len
    const chosenUser = users.find((user) => user.id === parseInt(id)); // конвертуємо id у число

    if (!chosenUser) {
      return res.sendStatus(404);
    }

    res.send(chosenUser);
  });

  // додати новий user до масиву
  app.post('/users', express.json(), (req, res) => {
    const { name } = req.body;

    if (!name) {
      return res.sendStatus(400);
    }

    const user = {
      id: getNextUserId(), // Використання функції для отримання нового id
      name,
    };

    users.push(user);

    res.status(201).send(user);
  });

  // видалити user з масиву за id
  app.delete('/users/:id', (req, res) => {
    const { id } = req.params;

    const newUsers = users.filter((user) => user.id !== parseInt(id));

    if (users.length === newUsers.length) {
      return res.sendStatus(404);
    }

    users = newUsers;

    res.sendStatus(204);
  });

  // відредагувати user з масиву
  app.patch('/users/:id', express.json(), (req, res) => {
    const { id } = req.params;
    const { name } = req.body;

    const chosenUser = users.find((user) => user.id === parseInt(id));

    if (typeof name !== 'string') {
      return res.sendStatus(400);
    }

    if (!chosenUser || !name) {
      return res.sendStatus(404);
    }

    Object.assign(chosenUser, { name });

    res.send(chosenUser);
  });

  // отримати всі expenses з масиву
  app.get('/expenses', (req, res) => {
    res.send(expenses);
  });

  // отримати конкретний expense з масиву
  app.get('/expenses/:id', (req, res) => {
    const { id } = req.params;

    const chosenExpense = expenses.find(
      (expense) => expense.id === parseInt(id),
    );

    if (!chosenExpense) {
      res.sendStatus(404);

      return;
    }

    res.send(chosenExpense);
  });

  // додати новий expense до масиву
  app.post('/expenses', express.json(), (req, res) => {
    const { userId, spentAt, title, amount, category, note } = req.body;

    if (!userId || !spentAt || !title || !amount || !category || !note) {
      return res.sendStatus(400);
    }

    const findUser = users.find((user) => user.id === userId);

    if (!findUser) {
      return res.sendStatus(400);
    }

    const newExpense = {
      id: getNextExpenseId(), // Використання функції для отримання нового id
      userId,
      spentAt,
      title,
      amount,
      category,
      note,
    };

    expenses.push(newExpense);

    res.status(201).send(newExpense);
  });

  // видалити expense з масиву
  app.delete('/expenses/:id', (req, res) => {
    const { id } = req.params;

    const newExpenses = expenses.filter(
      (expense) => expense.id !== parseInt(id),
    );

    if (expenses.length === newExpenses.length) {
      return res.sendStatus(404);
    }

    expenses = newExpenses;

    res.sendStatus(204);
  });

  // відредагувати expense з масиву
  app.put('/expenses/:id', express.json(), (req, res) => {
    const { id } = req.params;
    const { spentAt, title, amount, category, note } = req.body;

    const chosenExpense = expenses.find(
      (expense) => expense.id === parseInt(id),
    );

    if (
      typeof amount !== 'number' ||
      typeof title !== 'string' ||
      typeof category !== 'string' ||
      typeof note !== 'string'
    ) {
      return res.sendStatus(400);
    }

    if (!chosenExpense) {
      return res.sendStatus(404);
    }

    const isValidDate = Date.parse(spentAt);

    if (isNaN(isValidDate)) {
      return res.sendStatus(400);
    }

    Object.assign(chosenExpense, {
      spentAt,
      title,
      amount,
      category,
      note,
    });

    res.status(200).send(chosenExpense);
  });

  // отримати всі expenses для конкретного користувача
  app.get('/expenses', (req, res) => {
    const { userId } = req.query;

    // Parse userId to integer
    const parsedUserId = parseInt(userId, 10);

    if (isNaN(parsedUserId)) {
      return res.status(400);
    }

    // Filter expenses by userId
    const userExpenses = expenses.filter(
      (expense) => expense.userId === parsedUserId,
    );

    // eslint-disable-next-line no-console
    console.log(userId, userExpenses, expenses);

    res.send(userExpenses);
  });

  // отримати всі витрати між датами
  app.get('/expenses/:from/:to', (req, res) => {
    const { from, to } = req.params;

    // Parse the dates
    const fromDate = new Date(from);
    const toDate = new Date(to);

    // Check if the dates are valid
    if (isNaN(fromDate.getTime()) || isNaN(toDate.getTime())) {
      return res.status(400).send('Invalid date format. Use YYYY-MM-DD.');
    }

    // Filter expenses based on the date range
    const filteredExpenses = expenses.filter((expense) => {
      const expenseDate = new Date(expense.spentAt);

      return expenseDate >= fromDate && expenseDate <= toDate;
    });

    res.send(filteredExpenses);
  });

  // отримати всі витрати за категорією
  app.get('/expenses/category/:category', (req, res) => {
    const { category } = req.params;

    const categoryExpenses = expenses.filter(
      (expense) => expense.category === category,
    );

    res.send(categoryExpenses);
  });

  return app;
}

module.exports = {
  createServer,
};
