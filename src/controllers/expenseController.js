'use strict';

const { ExpenseService } = require('../services/expensesService');
const { UserService } = require('../services/usersService');

const expenseService = new ExpenseService();
const userService = new UserService();
const getAllExpensesController = (req, res) => {
  const expenses = expenseService.getAll(req.query);

  res.status(200);
  res.send(expenses);
};

const getOneExpenseController = (req, res) => {
  const { expenseId } = req.params;
  const foundExpense = expenseService.getOne(+expenseId);

  if (!foundExpense) {
    res.sendStatus(404);

    return;
  }

  res.statusCode = 200;
  res.send(foundExpense);
};

const createExpenseController = (req, res) => {
  const { title, userId } = req.body;
  const user = userService.getOne(userId);
  const isMandatoryData = title && userId;

  if (!isMandatoryData || !user) {
    res.sendStatus(400);

    return;
  }

  const newExpense = expenseService.create(req.body);

  res.status(201);
  res.send(newExpense);
};

const removeExpenseController = (req, res) => {
  const { expenseId } = req.params;
  const expenseShouldRemove = expenseService.getOne(+expenseId);

  if (!expenseShouldRemove) {
    res.sendStatus(404);

    return;
  }

  expenseService.remove(+expenseId);
  res.sendStatus(204);
};

const updateExpenseController = (req, res) => {
  const newExpenseData = req.body;
  const { expenseId } = req.params;
  const expenseShouldUpdate = expenseService.getOne(+expenseId);

  if (!expenseShouldUpdate) {
    res.sendStatus(404);

    return;
  }

  expenseService.update(+expenseId, newExpenseData);
  res.statusCode = 200;
  res.send(expenseShouldUpdate);
};

module.exports = {
  getAllExpensesController,
  createExpenseController,
  getOneExpenseController,
  removeExpenseController,
  updateExpenseController,
};
