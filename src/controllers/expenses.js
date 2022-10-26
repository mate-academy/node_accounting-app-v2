'use strict';

const expenseServise = require('../services/expenses.js');
const userServise = require('../services/users.js');

function add(req, res) {
  const { userId, spentAt, title, amount, category, note } = req.body;

  const foundUser = userServise.getUserById(userId);

  if (!foundUser) {
    res.sendStatus(400);

    return;
  }

  const newExtense = expenseServise.createNewExpense({
    userId,
    spentAt,
    title,
    amount,
    category,
    note,
  });

  res.statusCode = 201;
  res.send(newExtense);
};

function getAll(req, res) {
  const { userId, category, from, to } = req.query;
  const expenses = expenseServise.getAllExpenses();

  if (userServise.getUserById(userId)) {
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
};

function getById(req, res) {
  const expensesId = Number(req.params.id);
  const findExpense = expenseServise.getExpenseById(expensesId);

  if (!findExpense) {
    res.sendStatus(404);

    return;
  }

  res.sendStatus = 200;
  res.send(findExpense);
};

function remove(req, res) {
  const expensesId = Number(req.params.id);
  const filteredExpenses = expenseServise.getExpenseById(expensesId);

  if (!filteredExpenses) {
    res.sendStatus(404);

    return;
  }

  expenseServise.removeExpenses(expensesId);
  res.sendStatus(204);
};

function update(req, res) {
  const expensesId = Number(req.params.id);
  const foundExpenses = expenseServise.getExpenseById(expensesId);

  if (!foundExpenses) {
    res.sendStatus(404);

    return;
  };

  const { title } = req.body;

  expenseServise.updateExpenses({
    expensesId, title,
  });
  res.send(foundExpenses);
  res.statusCode = 200;
};

module.exports = {
  add,
  getById,
  getAll,
  remove,
  update,
};
