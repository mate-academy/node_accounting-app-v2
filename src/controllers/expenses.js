'use strict';

const userServise = require('../Services/user');
const expenseServise = require('../Services/expenses');

const add = (req, res) => {
  const {
    userId,
    spentAt,
    title,
    amount,
    category,
    note,
  } = req.body;
  const newExpense = expenseServise.createExpenses(
    userId,
    spentAt,
    title,
    amount,
    category,
    note,
  );

  if (!userServise.getAll().some(user => user.id === userId)) {
    res.sendStatus(400);

    return;
  }

  res.statusCode = 201;
  res.send(newExpense);
};

const getALL = (req, res) => {
  const {
    userId,
    category,
    from,
    to,
  } = req.query;

  const expenses = expenseServise.getAllExpenses({
    userId,
    category,
    from,
    to,
  });
  const foundUser = userServise.getUser(+userId);
  const filterExpenses = expenses.filter(
    expense => expense.userId === +userId
  );

  if (typeof +userId !== 'number') {
    res.sendStatus(404);

    return;
  }

  if (!expenses.length) {
    res.send([]);

    return;
  }

  if (from && to) {
    const expensesFromData = expenses.filter(
      expense => expense.spentAt >= from && expense.spentAt <= to
    );

    res.statusCode = 200;
    res.send(expensesFromData);

    return;
  }

  if (foundUser && category) {
    const expensesCategory = filterExpenses.filter(
      expense => expense.category === category
    );

    res.statusCode = 200;
    res.send(expensesCategory);

    return;
  }

  if (foundUser) {
    res.statusCode = 200;
    res.send(filterExpenses);

    return;
  }

  res.statusCode = 200;
  res.send(expenses);
};

const getOne = (req, res) => {
  const { id } = req.params;

  const foundExpense = expenseServise.getExpense(+id);

  if (!foundExpense) {
    res.sendStatus(404);

    return;
  }

  res.statusCode = 200;

  res.send(foundExpense);
};

const update = (req, res) => {
  const { id } = req.params;
  const { title } = req.body;
  const foundExpense = expenseServise.getExpense(+id);

  if (typeof +id !== 'number') {
    res.sendStatus(400);

    return;
  }

  if (!foundExpense) {
    res.sendStatus(404);

    return;
  }

  if (typeof title !== 'string') {
    res.sendStatus(404);

    return;
  }

  expenseServise.updateExpense({
    id,
    title,
  });

  res.statusCode = 200;

  res.send(foundExpense);
};

const remove = (req, res) => {
  const { id } = req.params;
  const filterExpenses = expenseServise.deleteExpense(id);

  if (filterExpenses.length === userServise.getAll().length) {
    res.sendStatus(404);

    return;
  }

  expenseServise.getAllExpenses = filterExpenses;

  res.sendStatus(204);
};

module.exports = {
  add,
  getALL,
  getOne,
  update,
  remove,
};
