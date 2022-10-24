'use strict';

const express = require('express');
const router = express.Router();
const cors = require('cors');

const {
  getAllExpenses,
  getExpenseById,
  updateExpenses,
  removeExpenses,
  createNewExpense,
  initExpenses,
} = require('./services/expenses');

const { getUserById } = require('./services/users');

function expencesRoutes(app) {
  router.use(cors());
  app.use('/expenses', router);

  initExpenses();

  router.post('/', express.json(), (req, res) => {
    const { userId, spentAt, title, amount, category, note } = req.body;

    const foundUser = getUserById(userId);

    if (!foundUser) {
      res.sendStatus(400);

      return;
    }

    const newExtense = createNewExpense({
      userId,
      spentAt,
      title,
      amount,
      category,
      note,
    });

    res.statusCode = 201;
    res.send(newExtense);
  });

  router.get('/', (req, res) => {
    const { userId, category, from, to } = req.query;
    const expenses = getAllExpenses();

    if (getUserById(userId)) {
      let userExpenses = expenses.filter(
        expense => expense.userId === +userId
      );

      if (category) {
        userExpenses = userExpenses.filter(
          expense => expense.category === category
        );
      }
      res.send(userExpenses);
    }

    if (from && to) {
      const expensesByDate = expenses.filter(
        (expense) => expense.spentAt >= from && expense.spentAt <= to
      );

      res.send(expensesByDate);
    }
    res.send(expenses);
  });

  router.get('/:expensesId', (req, res) => {
    const { expensesId } = req.params;
    const findExpense = getExpenseById(expensesId);

    if (!findExpense) {
      res.sendStatus(404);

      return;
    }

    res.sendStatus = 200;
    res.send(findExpense);
  });

  router.delete('/:expensesId', (req, res) => {
    const { expensesId } = req.params;
    const filteredExpenses = getExpenseById(expensesId);

    if (!filteredExpenses) {
      res.sendStatus(404);

      return;
    }

    removeExpenses(expensesId);
    res.sendStatus(204);
  });

  router.patch('/:expensesId', express.json(), (req, res) => {
    const { expensesId } = req.params;
    const foundExpenses = getExpenseById(expensesId);

    if (!foundExpenses) {
      res.sendStatus(404);

      return;
    };

    const { title } = req.body;

    updateExpenses({
      expensesId, title,
    });
    res.send(foundExpenses);
    res.statusCode = 200;
  });
}

module.exports = {
  expencesRoutes,
};
