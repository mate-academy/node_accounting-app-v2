'use strict';

const expenseServise = require('../functions/expense');
const userServise = require('../functions/users');

const postExpense = (req, res) => {
  const {
    userId,
    title,
  } = req.body;

  if (!title || !userServise.isIncludes(userId)) {
    res.sendStatus(400);

    return;
  }

  const newExpense = {
    ...req.body,
    id: Math.floor(Date.now() * Math.random()),
  };

  expenseServise.addExpense(newExpense);
  res.statusCode = 201;
  res.send(newExpense);
};

const getExpense = (req, res) => {
  const expenses = expenseServise.getAllExpense();
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
  };

  const userIdExpensed = userServise.findUserById(Number(userId));

  if (userIdExpensed) {
    let userExpenses = expenseServise.filter(
      expense => expense.userId === +userId
    );

    if (category) {
      userExpenses = userExpenses.filter(
        expense => expense.category === category
      );
    }

    res.send(userExpenses);

    return;
  }

  if (from || to) {
    const expensesBetweenDate = expenses.filter(
      (expense) => expense.spentAt >= from && expense.spentAt <= to);

    res.send(expensesBetweenDate);

    return;
  }

  res.send(expenseServise.getAllExpense());
};

const getExpenseId = (req, res) => {
  const expenseId = Number(req.params.id);

  if (typeof expenseId !== 'number') {
    res.sendStatus(400);

    return;
  }

  const foundExpense = expenseServise.findExpenseById(expenseId);

  if (!foundExpense) {
    res.sendStatus(404);

    return;
  }

  res.statusCode = 200;

  res.send(foundExpense);
};

const patchExpense = (req, res) => {
  const { id } = req.params;

  if (typeof +id !== 'number') {
    res.sendStatus(400);

    return;
  }

  const foundExpense = expenseServise.findExpenseById(Number(id));

  if (!foundExpense) {
    res.sendStatus(404);

    return;
  }

  expenseServise.updateExpense(foundExpense, req.body);
  res.send(foundExpense);
};

const deleteOneExpense = (req, res) => {
  const { id } = req.params;

  const foundExpense = expenseServise.findExpenseById(Number(id));

  if (!foundExpense) {
    res.sendStatus(404);

    return;
  };

  expenseServise.removeExpense(Number(id));
  res.sendStatus(204);
};

module.exports = {
  postExpense,
  getExpense,
  getExpenseId,
  patchExpense,
  deleteOneExpense,
};
