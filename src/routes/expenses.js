'use strict';

const express = require('express');

function expensesRouter(router, initialExpenses, initialUsers) {
  let expenses = initialExpenses;
  const users = initialUsers;

  router.get('/', (req, res) => {
    const { userId, category, from, to } = req.query;
    const foundUser = users.find(user => user.id === +userId);

    if (foundUser) {
      let userExpenses = expenses.filter(expense => expense.userId === +userId);

      if (category) {
        userExpenses = userExpenses.filter(
          expense => expense.category === category
        );
      }

      res.send(userExpenses);
    }

    if (from && to) {
      const dateExpenses = expenses.filter(
        expense => (expense.spentAt >= from && expense.spentAt <= to)
      );

      res.send(dateExpenses);
    }

    res.send(expenses);
  });

  router.get('/:expenseId', (req, res) => {
    const { expenseId } = req.params;
    const foundExpense = expenses.find(expense => expense.id === +expenseId);

    if (!foundExpense) {
      res.sendStatus(404);

      return;
    }

    res.send(foundExpense);
  });

  router.post('/', express.json(), (req, res) => {
    const { userId, title, spentAt, amount, category, note } = req.body;

    if (!users.some((user) => user.id === userId)) {
      res.sendStatus(400);
    }

    const newId = new Date() * Math.random();

    const newExpence = {
      id: newId,
      userId,
      spentAt,
      title,
      amount,
      category,
      note,
    };

    expenses.push(newExpence);

    res.statusCode = 201;
    res.send(newExpence);
  });

  router.delete('/:expenseId', (req, res) => {
    const { expenseId } = req.params;

    const filteredExpenses = expenses.filter(
      expense => expense.id !== +expenseId
    );

    if (filteredExpenses.length === expenses.length) {
      res.sendStatus(404);

      return;
    }

    expenses = filteredExpenses;

    res.sendStatus(204);
  });

  router.patch('/:expenseId', express.json(), (req, res) => {
    const { expenseId } = req.params;
    const { title } = req.body;

    const foundExpense = expenses.find(expense => expense.id === +expenseId);

    if (!foundExpense) {
      res.sendStatus(404);

      return;
    }

    Object.assign(foundExpense, { title });

    res.send(foundExpense);
  });
}

module.exports = { expensesRouter };
