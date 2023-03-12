'use strict';

const { expensesServices } = require('../services/expensesServices');
const { usersServices } = require('../services/usersServices');

const getAll = (req, res) => {
  const expenses = expensesServices.getAllExpenses(
    {
      ...req.query,
      userId: +req.query.userId,
    }
  );

  res.send(expenses);
};

const addExpense = (req, res) => {
  const {
    userId,
    spentAt,
    title,
    amount,
    category,
    note,
  } = req.body;

  if (
    !usersServices.getUserById(userId)
    || isNaN(Date.parse(spentAt))
    || !title
    || !(typeof amount === 'number')
    || !category
    || !note
  ) {
    res.sendStatus(400);

    return;
  }

  res.statusCode = 201;

  res.send(expensesServices.addExpense(
    userId,
    spentAt,
    title,
    amount,
    category,
    note,
  ));
};

const getExpense = (req, res) => {
  const { expenseId } = req.params;

  if (isNaN(+expenseId)) {
    res.sendStatus(400);

    return;
  }

  const foundExpense = expensesServices.getExpenseById(+expenseId);

  if (!foundExpense) {
    res.sendStatus(404);

    return;
  }

  res.send(foundExpense);
};

const deleteExpense = (req, res) => {
  const { expenseId } = req.params;
  const isExpenseDeleted = expensesServices.deleteExpense(+expenseId);

  if (!isExpenseDeleted) {
    res.sendStatus(404);

    return;
  }

  res.sendStatus(204);
};

const updateExpense = (req, res) => {
  const { expenseId } = req.params;

  if (!expenseId && !Object.entries(req.body).length) {
    res.sendStatus(400);

    return;
  }

  const expense = expensesServices.getExpenseById(+expenseId);

  if (!expense) {
    res.sendStatus(404);

    return;
  }

  for (const param of Object.entries(req.body)) {
    const nameOfParam = param[0];
    const paramValue = param[1];
    let isParamValid = false;

    switch (nameOfParam) {
      case 'spentAt':
        isParamValid = !isNaN(Date.parse(paramValue));
        break;
      case 'title':
        isParamValid = typeof paramValue === 'string';
        break;
      case 'amount':
        isParamValid = typeof paramValue === 'number';
        break;
      case 'category':
        isParamValid = typeof paramValue === 'string';
        break;
      case 'note':
        isParamValid = typeof paramValue === 'string';
        break;
      default:
        isParamValid = false;
    }

    if (!isParamValid) {
      res.sendStatus(400);

      return;
    }
  }

  expensesServices.updateExpense(expense, req.body);
  res.send(expense);
};

module.exports = {
  expensesController: {
    getAll,
    addExpense,
    getExpense,
    deleteExpense,
    updateExpense,
  },
};
