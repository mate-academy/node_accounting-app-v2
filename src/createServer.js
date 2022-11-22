'use strict';

const express = require('express');

const app = express();

function createServer() {
  const users = [];

  // const users = [
  //   {
  //     id: 1667341222327,
  //     name: 'Petro',
  //   },
  //   {
  //     id: 1667341225825,
  //     name: 'Nik',
  //   },
  //   {
  //     id: 1667341228571,
  //     name: 'Tol',
  //   },
  // ];
  // const expenses = [];
  const expenses = [];
  // const expenses = [
  //   {
  //     id: 11,
  //     userId: 1667341222327,
  //     spentAt: '2022-10-19T11:01:43.462Z',
  //     title: 'Buy a new laptop',
  //     amount: 999,
  //     category: 'Electronics',
  //     note: 'I need a new laptop',
  //   },
  //   {
  //     id: 12,
  //     userId: 1667341222327,
  //     spentAt: '2022-10-23T11:01:43.462Z',
  //     title: 'Buy a new car',
  //     amount: 111999,
  //     category: 'Transport',
  //     note: 'I need a new car',
  //   },
  //   {
  //     id: 21,
  //     userId: 1667341225825,
  //     spentAt: '2022-10-24T11:01:43.462Z',
  //     title: 'Buy a new plain',
  //     amount: 11199933,
  //     category: 'Transport',
  //     note: 'I need a new plain',
  //   },
  // ];

  function convertToSec(str) {
    const dateS = new Date(str).getTime();

    return Math.trunc(dateS / 1000);
  }

  app.get('/users', (req, res) => {
    res.statusCode = 200;
    res.send(users);
  });

  app.post('/users', express.json(), (req, res) => {
    const user = {
      id: null,
      name: '',
    };

    if (req.body.name) {
      user.id = new Date().getTime();
      user.name = req.body.name;
      users.push(user);
      res.statusCode = 201;
      res.send(user);

      return;
    };
    res.statusCode = 400;
    res.send('Bad request');
  });

  app.get('/users/:userId', (req, res) => {
    const { userId } = req.params;

    const foundUser = users.find((person) => person.id === +userId);

    if (!userId) {
      res.statusCode = 400;

      return;
    }

    if (!foundUser) {
      res.statusCode = 404;
      res.send('Not found');

      return;
    }
    res.statusCode = 200;
    res.send(foundUser);
  });

  app.delete('/users/:userId', (req, res) => {
    const { userId } = req.params;
    const foundIndex = users.findIndex((person) => person.id === +userId);

    if (foundIndex === -1) {
      res.statusCode = 404;
      res.send('Not found');

      return;
    }

    users.splice(foundIndex, 1);
    res.statusCode = 204;
    res.send('No Content');
  });

  app.patch('/users/:userId', express.json(), (req, res) => {
    const { userId } = req.params;
    const foundIndex = users.findIndex((person) => person.id === +userId);

    if (!req.body.name) {
      res.statusCode = 400;
      res.send('Bad Reques');

      return;
    }

    if (foundIndex === -1) {
      res.statusCode = 404;
      res.send('Not Found');

      return;
    }

    users[foundIndex].name = req.body.name;
    res.send(users[foundIndex]);
  });

  app.get('/expenses', (req, res) => {
    const strUrl = req.originalUrl;
    const arrParams = strUrl.match(/\w+=[\w\-:.]+/g);

    if (expenses.length === 0) {
      res.statusCode = 200;
      res.send([]);

      return;
    }

    if (!arrParams) {
      res.statusCode = 200;
      res.send(expenses);

      return;
    }

    const arrKeyValue = arrParams.map((el) => el.split('='));

    if (arrKeyValue[0][0] === 'userId' && arrKeyValue.length === 1) {
      const arrAllExpenses = expenses
        .filter((ex) => ex.userId === +arrKeyValue[0][1]);

      res.statusCode = 200;
      res.send(arrAllExpenses);

      return;
    }

    if (arrKeyValue[0][0] === 'from' && arrKeyValue[1][0] === 'to') {
      const arrAllExpenses = expenses
        .filter((ex) => (convertToSec(ex.spentAt)
        >= convertToSec(arrKeyValue[0][1]))
        && (convertToSec(ex.spentAt) <= convertToSec(arrKeyValue[1][1])));

      res.statusCode = 200;
      res.send(arrAllExpenses);

      return;
    }

    if (arrKeyValue[0][0] === 'userId' && arrKeyValue[1][0] === 'category') {
      const arrAllExpenses = expenses
        .filter((ex) => ex.userId === +arrKeyValue[0][1]
            && ex.category === arrKeyValue[1][1]);

      res.statusCode = 200;
      res.send(arrAllExpenses);
    }
  });

  app.post('/expenses', express.json(), (req, res) => {
    const foundIndex = users.find((person) => person.id === +req.body.userId);

    if (!req.body.userId || !foundIndex) {
      res.statusCode = 400;
      res.send('Bad Request');

      return;
    };

    const expense = {
      id: new Date().getTime(),
      userId: req.body.userId,
      spentAt: req.body.spentAt,
      title: req.body.title,
      amount: req.body.amount,
      category: req.body.category,
      note: req.body.note,
    };

    expenses.push(expense);
    res.statusCode = 201;
    res.send(expense);
  });

  app.get('/expenses/:expenseId', (req, res) => {
    const { expenseId } = req.params;
    const foundExpense = expenses.find((ex) => ex.id === +expenseId);

    if (!expenseId) {
      res.statusCode = 400;
      res.send('Bad Request');

      return;
    }

    if (!foundExpense) {
      res.statusCode = 404;
      res.send('Not found');

      return;
    }

    res.send(foundExpense);
  });

  app.delete('/expenses/:expenseId', (req, res) => {
    const { expenseId } = req.params;
    const foundIndex = expenses.findIndex((ex) => ex.id === +expenseId);

    if (foundIndex === -1) {
      res.statusCode = 404;
      res.send('Not found');

      return;
    }

    expenses.splice(foundIndex, 1);
    res.statusCode = 204;
    res.send('No Content');
  });

  app.patch('/expenses/:expenseId', express.json(), (req, res) => {
    const { expenseId } = req.params;
    const foundIndex = expenses.findIndex((ex) => ex.id === +expenseId);

    if (!req.body) {
      res.statusCode = 400;
      res.send('Bad Request');

      return;
    }

    if (foundIndex === -1) {
      res.statusCode = 404;
      res.send('Not Found');

      return;
    }

    res.send(Object.assign(expenses[foundIndex], req.body));
  });

  return app;
}

module.exports = {
  createServer,
};
// if (expenses.length === 0) {
//   res.statusCode = 200;
//   res.send([]);
//   res.send('Ok');

//   return;
// };
