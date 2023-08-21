/* eslint-disable max-len */
'use strict';

const express = require('express');
const { generateId } = require('./generateId');

function getAllExpenses(app) {
  app.get('/expenses', express.json(), (req, res) => {
    const { userId, categories, from, to } = req.query;

    if (!userId && !categories && !from && !to) {
      res.status(200).send(app.expenses);

      return;
    }

    let expenses = app.expenses;

    if (userId) {
      expenses = expenses.filter(expense => expense.userId === +userId);
    }

    if (categories) {
      expenses = expenses.filter(expense => categories.includes(expense.category));
    }

    if (from) {
      expenses = expenses.filter(expense => expense.spentAt >= from);
    }

    if (to) {
      expenses = expenses.filter(expense => expense.spentAt <= to);
    }

    res.status(200).send(expenses);
  });
}

function getExpense(app) {
  app.get('/expenses/:expenseId', (req, res) => {
    const { expenseId } = req.params;
    const foundExpense = app.expenses.find(expense => expense.id === +expenseId);

    if (!foundExpense) {
      res.status(404).send('Exprence does not exist');

      return;
    }

    res.status(200).send(foundExpense);
  });
}

function createNewExpense(app) {
  app.post('/expenses', express.json(), (req, res) => {
    const {
      userId,
      spentAt,
      title,
      amount,
      category,
      note,
    } = req.body;

    if (userId === undefined || !spentAt || !title || amount === undefined || !category || !note) {
      res.status(400).send('Incorrect expense info');

      return;
    }

    if (!app.getUser(userId)) {
      res.status(400).send('User is not found');

      return;
    }

    const newExpense = {
      id: generateId(app.expenses),
      userId,
      spentAt,
      title,
      amount,
      category,
      note,
    };

    app.expenses.push(newExpense);

    res.status(201).send(newExpense);
  });
}

function removeExpense(app) {
  app.delete('/expenses/:expenseId', (req, res) => {
    const { expenseId } = req.params;
    const existExpense = app.expenses.some(expense => expense.id === +expenseId);
    const filteredExpres = app.expenses.filter(experse => experse.id !== +expenseId);

    if (!existExpense) {
      res.status(404).send('Expense does not exist');

      return;
    }

    app.expenses = filteredExpres;

    res.status(204).send(app.expenses);
  });
}

function updateExpense(app) {
  app.patch('/expenses/:expenseId', express.json(), (req, res) => {
    const { expenseId } = req.params;
    const foundExpense = app.expenses.find(expense => expense.id === +expenseId);

    if (!foundExpense) {
      res.status(404).send('Expense is not found');

      return;
    }

    Object.entries(req.body).map(([key, value]) => {
      if (Object.keys(foundExpense).includes(key) && typeof foundExpense[key] === typeof value) {
        Object.assign(foundExpense, {
          [key]: value,
        });
      }
    });

    res.status(200).send(foundExpense);
  });
}

module.exports = {
  getAllExpenses, getExpense, createNewExpense, removeExpense, updateExpense,
};
