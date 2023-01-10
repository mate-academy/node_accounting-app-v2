'use strict';

const usersControllers = require('./usersControllers.js');

let expenses = [];

const init = () => {
  expenses = [];
};

const getExpenses = (req, res) => {
  const {
    userId,
    category,
    from,
    to,
  } = req.query;

  if (typeof +userId !== 'number') {
    res.sendStatus(400);

    return;
  };

  if (expenses.length === 0) {
    res.send([]);

    return;
  };

  if (usersControllers.findUser(+userId)) {
    let userExpenses = expenses.filter(expense => expense.userId === +userId);

    if (category) {
      userExpenses = userExpenses.filter(
        (expense) => expense.category === category
      );
    }
    res.send(userExpenses);

    return;
  }

  if (from && to) {
    const foundExpenses = expenses.filter(
      (expense) => expense.spentAt >= from && expense.spentAt <= to);

    res.send(foundExpenses);

    return;
  }

  res.send(expenses);
};

const createExpense = (req, res) => {
  const {
    userId,
    spentAt,
    title,
    amount,
    category,
    note,
  } = req.body;

  if (!title || !usersControllers.isUserExist(+userId)) {
    res.sendStatus(400);

    return;
  }

  const id = Math.round(Date.now() * Math.random());

  const expenseWitId = {
    id,
    userId,
    spentAt,
    title,
    amount,
    category,
    note,
  };

  expenses.push(expenseWitId);
  res.status(201);
  res.send(expenseWitId);
};

const getExpense = (req, res) => {
  const { id } = req.params;

  const expenseTargert = expenses.find(expense => expense.id === +id);

  if (!expenseTargert) {
    res.sendStatus(404);

    return;
  }

  res.send(expenseTargert);
};

const deleteExpense = (req, res) => {
  const { id } = req.params;
  const expenseTarget = expenses.find(expense => expense.id === +id);

  if (!expenseTarget) {
    res.sendStatus(404);

    return;
  }

  expenses = expenses.filter(expense => expense.id !== +id);

  res.sendStatus(204);
};

const updateExpense = (req, res) => {
  const { id } = req.params;

  const expenseTarget = expenses.find(expense => expense.id === +id);

  if (!expenseTarget) {
    res.sendStatus(404);

    return;
  }

  const updatedExpense = Object.assign(expenseTarget, req.body);

  res.send(updatedExpense);
};

module.exports = {
  init,
  getExpenses,
  createExpense,
  getExpense,
  deleteExpense,
  updateExpense,
};
