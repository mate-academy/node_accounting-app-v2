'use strict';

const express = require('express');

function createServer() {
  const app = express();

  app.use(express.json());

  const users = [];
  const expenses = [];
  let userIdCounter = 1;
  let expenseIdCounter = 1;

  app.get('/users', function (req, res) {
    res.status(200).json(users);
  });

  app.get('/users/:id', function (req, res) {
    const id = req.params.id;
    const user = users.find(function (u) {
      return u.id === Number(id);
    });

    if (!user) {
      res.status(404).send('User not found');

      return;
    }

    res.status(200).json(user);
  });

  app.post('/users', function (req, res) {
    const name = req.body.name;

    if (!name) {
      res.status(400).send('Name is required');

      return;
    }

    const newUser = {
      id: userIdCounter++,
      name: name,
    };

    users.push(newUser);
    res.status(201).json(newUser);
  });

  app.patch('/users/:id', function (req, res) {
    const id = req.params.id;
    const user = users.find(function (u) {
      return u.id === Number(id);
    });

    if (!user) {
      res.status(404).send('User not found');

      return;
    }

    const name = req.body.name;

    if (name) {
      user.name = name;
    }

    res.status(200).json(user);
  });

  app['delete']('/users/:id', function (req, res) {
    const id = req.params.id;
    const userIndex = users.findIndex(function (u) {
      return u.id === Number(id);
    });

    if (userIndex === -1) {
      res.status(404).send('User not found');

      return;
    }

    users.splice(userIndex, 1);
    res.status(204).send();
  });

  app.get('/expenses', function (req, res) {
    const _req$query = req.query;
    const userId = _req$query.userId;
    const categories = _req$query.categories;
    const from = _req$query.from;
    const to = _req$query.to;
    let result = expenses;

    if (userId) {
      result = result.filter(function (e) {
        return e.userId === Number(userId);
      });
    }

    if (categories) {
      const categoryList = Array.isArray(categories)
        ? categories
        : [categories];

      result = result.filter(function (e) {
        return categoryList.includes(e.category);
      });
    }

    if (from) {
      result = result.filter(function (e) {
        return new Date(e.spentAt) >= new Date(from);
      });
    }

    if (to) {
      result = result.filter(function (e) {
        return new Date(e.spentAt) <= new Date(to);
      });
    }

    res.status(200).json(result);
  });

  app.get('/expenses/:id', function (req, res) {
    const id = req.params.id;
    const expense = expenses.find(function (e) {
      return e.id === Number(id);
    });

    if (!expense) {
      res.status(404).send('User not found');

      return;
    }

    res.status(200).json(expense);
  });

  app.post('/expenses', function (req, res) {
    const _req$body = req.body;
    const userId = _req$body.userId;
    const spentAt = _req$body.spentAt;
    const title = _req$body.title;
    const amount = _req$body.amount;
    const category = _req$body.category;
    const note = _req$body.note;
    const NumberUserId = Number(userId);
    const sameUser = users.find(function (u) {
      return u.id === NumberUserId;
    });

    if (!sameUser) {
      res.status(404).send('User is already exist');

      return;
    }

    if (!userId || !spentAt || !title || !amount || !category) {
      res.status(400).send('Missing required fields');

      return;
    }

    const newExpense = {
      id: expenseIdCounter++,
      userId: userId,
      spentAt: spentAt,
      title: title,
      amount: amount,
      category: category,
      note: note,
    };

    expenses.push(newExpense);
    res.status(201).json(newExpense);
  });

  app.patch('/expenses/:id', function (req, res) {
    const id = req.params.id;
    const expense = expenses.find(function (e) {
      return e.id === Number(id);
    });

    if (!expense) {
      res.status(404).send('Expense not found');

      return;
    }

    const _req$body2 = req.body;
    const spentAt = _req$body2.spentAt;
    const title = _req$body2.title;
    const amount = _req$body2.amount;
    const category = _req$body2.category;
    const note = _req$body2.note;

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
  });

  app['delete']('/expenses/:id', function (req, res) {
    const id = req.params.id;
    const expenseIndex = expenses.findIndex(function (e) {
      return e.id === Number(id);
    });

    if (expenseIndex === -1) {
      res.status(404).send('Expense not found');

      return;
    }

    expenses.splice(expenseIndex, 1);
    res.status(204).send();
  });

  return app;
}

module.exports = {
  createServer: createServer,
};
