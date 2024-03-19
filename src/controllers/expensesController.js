'use strict';

const expensesService = require('../services/expensesService');
const usersService = require('../services/usersService');

const codeStatus = require('../codeStatuses');

const getAllExpenses = (req, res) => {
  const { userId, categories, from, to } = req.query;

  res.statusCode = codeStatus.SUCCESS;

  res.send(
    expensesService.getFilteredExpenses({
      userId,
      categories,
      from,
      to,
    }),
  );
};

const getExpenseById = (req, res) => {
  const { id } = req.params;
  const choosedExpense = expensesService.getExpenseById(id);

  if (!choosedExpense) {
    res.sendStatus(codeStatus.NOT_FOUND);

    return;
  }

  res.send(choosedExpense);
};

const addExpense = (req, res) => {
  const data = req.body;

  if (!usersService.getUserById(data.userId)) {
    res.sendStatus(codeStatus.BAD_REQUEST);

    return;
  }

  const newExpense = expensesService.addExpense(data);

  res.status(201).send(newExpense);
};

const updateExpense = (req, res) => {
  const { id } = req.params;
  const { data } = req.body;
  const choosedExpense = expensesService.getExpenseById(id);

  if (!choosedExpense) {
    res.sendStatus(codeStatus.NOT_FOUND);

    return;
  }

  const updatedExpense = expensesService.updateUserName({ id, data });

  res.send(updatedExpense);
};

const deleteExpense = (req, res) => {
  const { id } = req.params;

  if (!expensesService.getExpenseById(id)) {
    res.sendStatus(codeStatus.NOT_FOUND);

    return;
  }

  expensesService.deleteExpense(id);

  res.sendStatus(codeStatus.UNDERSTOOD);
};

module.exports = {
  getAllExpenses,
  getExpenseById,
  addExpense,
  updateExpense,
  deleteExpense,
};
