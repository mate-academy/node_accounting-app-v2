/* eslint-disable no-console */
'use strict';

const { getId } = require('../utils.js');

const createExpenses = () => {
  let expenses = [];

  return {
    getAll(req, res) {
      const newUrl = new URL(req.url, `http://${req.headers.host}`);
      const userId = Number(newUrl.searchParams.get('userId'));
      const from = Date.parse(newUrl.searchParams.get('from'));
      const to = Date.parse(newUrl.searchParams.get('to'));
      const categories = newUrl.searchParams.get('categories');

      if (userId) {
        expenses = expenses.filter(expense => expense.userId === userId);
      }

      if (from) {
        expenses = expenses.filter(expense => (
          Date.parse(expense.spentAt) >= from)
        );
      }

      if (to) {
        expenses = expenses.filter(expense => (
          Date.parse(expense.spentAt) <= to)
        );
      }

      if (categories) {
        expenses = expenses.filter(expense => expense.category === categories);
      }

      res.send(expenses);
    },

    getOne(req, res) {
      const id = getId(req, '/expenses/:id');
      const expense = expenses.find(el => el.id === Number(id));

      if (!expense) {
        res.sendStatus(404);

        return;
      }

      res.send(expense);
    },

    post(users) {
      return (req, res) => {
        const { userId, spentAt, title, amount, category, note } = req.body;
        const user = users.find(el => el.id === userId);

        if (
          !user
        || !userId || !spentAt || !title || !amount || !category || !note
        ) {
          res.sendStatus(400);

          return;
        }

        const newExpense = {
          userId,
          spentAt,
          title,
          amount,
          category,
          note,
          id: expenses.length + 1,
        };

        expenses.push(newExpense);

        res.statusCode = 201;
        res.statusMessage = 'Created';
        res.send(newExpense);
      };
    },

    delete(req, res) {
      const id = getId(req, '/expenses/:id');
      const newExpenses = expenses.filter(el => el.id !== Number(id));

      if (newExpenses.length === expenses.length) {
        res.sendStatus(404);

        return;
      }

      expenses = newExpenses;
      res.sendStatus(204);
    },

    patch(req, res) {
      const id = getId(req, '/expenses/:id');
      const expense = expenses.find(el => el.id === Number(id));

      if (!expense) {
        res.sendStatus(404);

        return;
      }

      if (!req.body) {
        res.sendStatus(404);

        return;
      }

      const { spentAt, title, amount, category, note } = req.body;

      if (
        !spentAt && !title && !amount && !category && !note
      ) {
        res.sendStatus(400);

        return;
      }

      for (const key in req.body) {
        expense[key] = req.body[key];
      }

      res.send(expense);
    },
  };
};

module.exports = {
  createExpenses,
};
