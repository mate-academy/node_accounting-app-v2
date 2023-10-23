/* eslint-disable no-console */
/* eslint-disable no-unused-vars */
/* eslint-disable max-len */
'use strict';

const express = require('express');
const app = express();

app.use(express.json());

// Initialize empty data storage (in-memory)
let users = [];
let expenses = [];

const clearMemory = () => {
  users = [];
  expenses = [];
};

const getUserById = (id) => {
  return users.find(user => user.id === +id) || null;
};

const getExpenseByAmount = (amount) => {
  return expenses.find(e => e.amount === +amount) || null;
};

// Function to handle 404 errors
function handleNotFound(req, res) {
  res.status(404).json({ message: 'Not found' });
}

// Function to handle 400 errors
function handleBadRequest(res, message) {
  res.status(400).json({ message });
}

// Endpoint do tworzenia nowego użytkownika
app.post('/users', (req, res) => {
  const { name } = req.body;

  if (!name) {
    return handleBadRequest(res, 'Pole "name" jest wymagane.');
  }

  const newId = users.length + 11;

  if (getUserById(newId)) {
    res.sendStatus(400);

    return;
  }

  const newUser = {
    id: newId,
    name,
  };

  users.push(newUser);

  res.status(201).json(newUser);
});

// Endpoint do pobierania informacji o wszystkich użytkownikach
app.get('/users', (req, res) => {
  if (users.length === 0) {
    console.log('not ok', users, res.statusCode, res.body);
    res.status(200);

    return res.status(200).json([]);
  }
  console.log('ok', users);
  res.json(users);
});

// Endpoint do pobierania informacji o konkretnym użytkowniku na podstawie ID
app.get('/users/:id', (req, res) => {
  const userId = parseInt(req.params.id, 10);
  const user = users.find((u) => u.id === userId);

  if (!user) {
    return handleNotFound(req, res);
  }

  res.json(user);
});

// Endpoint do usuwania użytkownika na podstawie ID
app.delete('/users/:id', (req, res) => {
  const userId = parseInt(req.params.id, 10);
  const userIndex = users.findIndex((u) => u.id === userId);

  if (userIndex === -1) {
    return handleNotFound(req, res);
  }

  users.splice(userIndex, 1);
  res.status(204).end();
});

// Endpoint do edycji istniejącego użytkownika na podstawie ID
app.patch('/users/:id', (req, res) => {
  const { id } = req.params;
  const { name } = req.body;

  const user = getUserById(id);

  if (!user) {
    res.sendStatus(404);

    return;
  }

  // Utwórz nowy obiekt użytkownika zaktualizowanym polem 'name'
  const updatedUser = {
    ...user, name,
  };

  // Zaktualizuj użytkownika w tablicy użytkowników
  users[users.findIndex(u => u.id === +id)] = updatedUser;

  res.send(updatedUser);
});

// Endpoint do tworzenia nowego wydatku
app.post('/expenses', (req, res) => {
  const { userId, spentAt, title, amount, category, note } = req.body;

  if (!userId || !spentAt || !title || !amount || !category) {
    return handleBadRequest(res, 'Pola "userId," "spentAt," "title," "amount," i "category" są wymagane.');
  }

  if (!getUserById(userId)) {
    res.sendStatus(400);

    return;
  }

  const newExpense = {
    id: expenses.length + 1,
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

// Endpoint do pobierania informacji o wszystkich wydatkach z filtrowaniem
app.get('/expenses', (req, res) => {
  const { userId, spentAt, title, amount, category, note, from, to } = req.query;

  const startDate = new Date(req.query.startDate);
  const endDate = new Date(req.query.endDate);

  let filteredExpenses = expenses;

  // eslint-disable-next-line no-console, no-undef
  console.log(req.query, +userId, !!userId);

  // Sprawdź, czy jest coś do zwrócenia
  if (!userId && !spentAt && !title && !amount && !category && !note && !from && filteredExpenses.length === 0) {
    return res.json([]);
  } else if (!userId && !spentAt && !title && !amount && !category && !note && !from && (filteredExpenses.length > 0)) {
    return res.json(filteredExpenses);
  } else if (!!userId && !category) {
    filteredExpenses = filteredExpenses
      .filter((e) => e.userId === +userId);

    // eslint-disable-next-line no-useless-return
    return res.json(filteredExpenses);
  } else if (!!category && !!userId) {
    filteredExpenses = filteredExpenses
      .filter((e) => e.category === category);

    // eslint-disable-next-line no-useless-return
    return res.json(filteredExpenses);
  } else if (!!from && !!to) {
    const fromDate = new Date(from);
    const toDate = new Date(to);

    const toReturn = [];

    filteredExpenses.forEach((expense) => {
      const expenseDate = new Date(expense.spentAt);

      console.log(fromDate < toDate, expenseDate < toDate);

      if (expenseDate >= fromDate && expenseDate <= toDate) {
        console.log('test');
        toReturn.push(expense);
      }
    });

    return res.json(toReturn);
  }
});

// Endpoint do pobierania informacji o konkretnym wydatku na podstawie ID
app.get('/expenses/:id', (req, res) => {
  const expenseId = parseInt(req.params.id, 10);
  const expense = expenses.find((e) => e.id === expenseId);

  if (!expense) {
    return handleNotFound(req, res);
  }

  res.json(expense);
});

// Endpoint do usuwania wydatku na podstawie ID
app.delete('/expenses/:id', (req, res) => {
  const expenseId = parseInt(req.params.id, 10);
  const expenseIndex = expenses.findIndex((e) => e.id === expenseId);

  if (expenseIndex === -1) {
    return res.status(404).end();
  } else {
    expenses.splice(expenseIndex, 1);
    console.log(req.query, expenseIndex, res.statusCode, res.body, expenses);
    res.status(204).end();
  }
});

// Endpoint do edycji istniejącego wydatku na podstawie ID
app.patch('/expenses/:id', (req, res) => {
  const expenseId = parseInt(req.params.id, 10);
  const { userId, spentAt, title, amount, category, note } = req.body;

  const expenseIndex = expenses.findIndex((e) => e.id === expenseId);

  if (expenseIndex === -1) {
    res.status(404).end();
  }

  const existingExpense = expenses[expenseIndex];

  if (userId !== undefined) {
    existingExpense.userId = userId;
  }

  if (spentAt !== undefined) {
    existingExpense.spentAt = spentAt;
  }

  if (title !== undefined) {
    existingExpense.title = title;
  }

  if (amount !== undefined) {
    existingExpense.amount = amount;
  }

  if (category !== undefined) {
    existingExpense.category = category;
  }

  if (note !== undefined) {
    existingExpense.note = note;
  }

  expenses[expenseIndex] = existingExpense;

  res.json(existingExpense);
});

app.use(handleNotFound);

// Export the Express app
function createServer() {
  clearMemory();

  return app;
}

module.exports = {
  createServer,
};
