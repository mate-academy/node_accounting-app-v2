/* eslint-disable no-param-reassign */
'use strict';

const helpers = require('../services/helpers.js');
const expensesServices = require('../services/expenses.js');

const getAllExpenses = (expenses) => {
  return (req, res) => {
    const selectedUserId = +req.query.userId;
    const { categories, from, to } = req.query;

    const filteredExpenses = expensesServices.getFilteredExpenses(expenses, {
      selectedUserId,
      categories,
      from,
      to,
    });

    res.status(200).send(filteredExpenses);
  };
};

const getExpenseById = (expenses) => {
  return (req, res) => {
    const expenseId = +req.params.expenseId;

    if (isNaN(expenseId)) {
      res.sendStatus(400);

      return;
    }

    const expenseById = helpers.getElementById(expenses, expenseId);

    if (!expenseById) {
      res.sendStatus(404);

      return;
    }

    res.status(200).send(expenseById);
  };
};

const createExpense = (expenses, users) => {
  return (req, res) => {
    const {
      userId,
      spentAt,
      title,
      amount,
      category,
      note,
    } = req.body;

    const expenseData = {
      userId,
      spentAt,
      title,
      amount,
      category,
      note,
    };

    if (expensesServices.isDataValid({
      users,
      ...expenseData,
    })) {
      res.sendStatus(400);

      return;
    }

    const newExpense = {
      id: helpers.getNewId(expenses),
      ...expenseData,
    };

    expenses.push(newExpense);

    res.status(201).send(newExpense);
  };
};

const updateExpense = (expenses) => {
  return (req, res) => {
    const expenseId = +req.params.expenseId;

    const expenseToUpdate = helpers.getElementById(expenses, expenseId);

    if (!expenseToUpdate) {
      res.sendStatus(404);

      return;
    }

    const {
      spentAt,
      title,
      amount,
      category,
      note,
    } = req.body;

    Object.assign(expenseToUpdate, {
      spentAt: spentAt || expenseToUpdate.spentAt,
      title: title || expenseToUpdate.title,
      amount: amount || expenseToUpdate.amount,
      category: category || expenseToUpdate.category,
      note: note || expenseToUpdate.note,
    });

    res.status(200).send(expenseToUpdate);
  };
};

const deleteExpense = (expenses) => {
  return (req, res) => {
    const expenseId = +req.params.expenseId;

    const isExists = helpers.isElementExists(expenses, expenseId);

    if (!isExists) {
      res.sendStatus(404);

      return;
    }

    expenses = helpers.deleteElementById(expenses, expenseId);

    res.sendStatus(204);
  };
};

module.exports = {
  getAllExpenses,
  getExpenseById,
  createExpense,
  updateExpense,
  deleteExpense,
};
