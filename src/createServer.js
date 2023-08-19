'use strict';

const express = require('express');

function createServer() {
  let users = [];
  let expenses = [];

  // let users = [{
  //   id: '0', name: 'Nate',
  // }, {
  //   id: '1', name: 'Leo',
  // }];

  // let expenses = [
  //   {
  //     id: '0',
  //     userId: '0',
  //     spentAt: '2023-08-18T15:47:26.134Z',
  //     title: 'Exp1',
  //     amount: 2,
  //     category: 'string',
  //     note: 'string',
  //   },

  //   {
  //     id: '1',
  //     userId: '1',
  //     spentAt: '2023-08-18T15:47:26.134Z',
  //     title: 'Exp2',
  //     amount: 3,
  //     category: 'string2',
  //     note: 'string',
  //   },
  // ];

  const app = express();

  app.use(express.json());

  app.get('/users', (req, res) => {
    res.send(users);
  });

  app.get('/users/:id', (req, res) => {
    const { id } = req.params;
    const foundUser = users.find(user => user.id === Number(id));

    if (!foundUser) {
      res.sendStatus(404);

      return;
    }

    res.send(foundUser);
  });

  app.post('/users', (req, res) => {
    const { name } = req.body;

    if (!name) {
      res.sendStatus(400);

      return;
    }

    const newUser = {
      id: Date.now(),
      name,
    };

    users.push(newUser);

    res.sendStatus(201);
    res.send((newUser));
  });

  app.delete('/users/:id', (req, res) => {
    const { id } = req.params;

    const filteredUsers = users.filter(user => user.id !== Number(id));

    if (filteredUsers.length === users.length) {
      res.sendStatus(404);

      return;
    }

    users = filteredUsers;

    res.sendStatus(204);
  });

  app.patch('/users/:id', (req, res) => {
    const { id } = req.params;
    const foundUser = users.find(user => user.id === Number(id));

    if (!foundUser) {
      res.sendStatus(400);

      return;
    }

    const { name } = req.body;

    if (typeof name !== 'string') {
      res.send(400);

      return;
    }

    foundUser.name = name;

    users = users.map(user => {
      if (user.id === id) {
        return ({
          ...foundUser,
        });
      } else {
        return user;
      }
    });

    res.send(foundUser);
  });

  app.get('/expenses', (req, res) => {
    let tempExpenses = [...expenses];
    const query = req.query;

    if (Object.keys(query).length === 0) {
      res.send(tempExpenses);
    } else {
      const { userId, categories, from, to } = query;

      if (userId) {
        tempExpenses = tempExpenses
          .filter(expense => expense.userId === Number(userId));
      }

      if (categories) {
        tempExpenses = tempExpenses
          .filter(expense => categories.includes(expense.category));
      }

      if (from) {
        tempExpenses = tempExpenses
          .filter(expense => expense.spentAt >= from);
      }

      if (to) {
        tempExpenses = tempExpenses
          .filter(expense => expense.spentAt <= to);
      }

      res.send(tempExpenses);
    }
  });

  app.get('/expenses/:id', (req, res) => {
    const { id } = req.params;

    const foundExpense = expenses.find(expense => expense.id === Number(id));

    if (!foundExpense) {
      res.sendStatus(404);

      return;
    }

    res.send(foundExpense);
  });

  app.post('/expenses', (req, res) => {
    const
      { userId, title, spentAt, amount, category, note } = req.body;

    if (!title || !userId || !spentAt || !category || !note || !amount) {
      res.sendStatus(400);

      return;
    }

    const foundUser = users.find(user => user.id === Number(userId));

    if (!foundUser) {
      res.statusCode = 400;
      res.send('User is not found');

      return;
    }

    const newExpence = {
      id: Date.now(),
      userId,
      spentAt,
      title,
      amount,
      category,
      note,
    };

    expenses.push(newExpence);
    res.sendStatus(201);
    res.send(newExpence);
  });

  app.delete('/expenses/:id', (req, res) => {
    const { id } = req.params;

    const filteredExpenses = expenses
      .filter(expense => expense.id !== Number(id));

    if (filteredExpenses.length === expenses.length) {
      res.sendStatus(404);

      return;
    }

    expenses = filteredExpenses;

    res.sendStatus(204);
  });

  app.patch('/expenses/:id', express.json(), (req, res) => {
    const { id } = req.params;
    let foundExpense = expenses.find(expense => expense.id === Number(id));

    if (!foundExpense) {
      res.sendStatus(404);

      return;
    }

    foundExpense = {
      ...foundExpense,
      ...req.body,
    };

    expenses = expenses.map(expense => {
      if (expense.id === id) {
        return ({
          ...foundExpense,
        });
      } else {
        return expense;
      }
    });

    res.send(foundExpense);
  });

  return app;
}

module.exports = {
  createServer,
};
