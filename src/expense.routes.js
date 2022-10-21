'use strict';

const {
  getExpenseById, removeExpense, updateExpense, createExpense,
  getExpenseByTime, getExpenseByUser, getExpensesByCat,
} = require('./services/expenses');

const { getById } = require('./services/users.js');

function InitExpenseRoute(app, { users, expenses }) {
  app.post('/', (req, res) => {
    const {
      userId,
      spentAt,
      title,
      amount,
      category,
      note,
    } = req.body;

    const foundUser = getById(users, userId);

    if (!foundUser) {
      res.sendStatus(400);

      return;
    };

    const newExpenses = createExpense(expenses, userId,
      spentAt, title, amount, category, note);

    res.statusCode = 201;
    res.send(newExpenses);
  });

  app.get('/', (req, res) => {
    const {
      userId,
      category,
      from,
      to,
    } = req.query;

    const id = +userId;

    if (typeof id !== 'number') {
      res.sendStatus(400);

      return;
    }

    const foundUser = getById(users, id);

    if (foundUser) {
      const expensesFilteredByUser = getExpenseByUser(expenses, id);

      if (category) {
        const expensesFilteredByCat = getExpensesByCat(
          expensesFilteredByUser, category
        );

        res.send(expensesFilteredByCat);

        return;
      }

      res.send(expensesFilteredByUser);

      return;
    }

    if (from && to) {
      const expensesFilteredByDate = getExpenseByTime(expenses, from, to);

      res.send(expensesFilteredByDate);

      return;
    }

    res.send(expenses);
  });

  app.patch('/:id', (req, res) => {
    const { id } = req.params;

    if (typeof +id !== 'number') {
      res.sendStatus(400);

      return;
    };

    const foundExpense = getExpenseById(expenses, +id);

    if (!foundExpense) {
      res.sendStatus(404);

      return;
    };

    const body = req.body;

    updateExpense(expenses, +id,
      body);

    res.send(foundExpense);
    res.sendStatus(200);
  });

  app.get('/:id', (req, res) => {
    const { id } = req.params;
    const foundExpense = getExpenseById(expenses, +id);

    if (!foundExpense) {
      res.sendStatus(404);

      return;
    }

    res.statusCode = 200;
    res.send(foundExpense);
  });

  app.delete('/:id', (req, res) => {
    const { id } = req.params;
    const foundExpense = getExpenseById(expenses, +id);

    if (!foundExpense) {
      res.sendStatus(404);

      return;
    }

    // eslint-disable-next-line no-param-reassign
    expenses = removeExpense(expenses, +id);
    res.sendStatus(204);
  });
}

module.exports = {
  InitExpenseRoute,
};
