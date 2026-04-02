const expensesService = require('../services/expenses.service.js');
const usersService = require('../services/users.service.js');

const getAll = (req, res) => {
  if (Object.keys(req.query).length > 0) {
    const expenses = expensesService.getWithFilters(req.query);

    return res.send(expenses);
  }
  res.send(expensesService.get());
};

const getOne = (req, res) => {
  const id = Number(req.params.id);
  const expense = expensesService.getById(id);

  if (!expense) {
    return res.status(404).send('Expense not found');
  }

  res.send(expense);
};

const createExpense = (req, res) => {
  if (!req.body) {
    return res.status(400).send('Fields must be filled');
  }

  const validation = expensesService.fieldsValidation(req.body);

  if (!validation.status) {
    return res.status(400).send(validation.error);
  }

  const { userId } = req.body;

  if (!usersService.getById(userId)) {
    return res.status(400).send('User not found');
  }

  const expense = expensesService.create(req.body);

  res.status(201).send(expense);
};

const deleteExpense = (req, res) => {
  const id = Number(req.params.id);

  if (!expensesService.getById(id)) {
    return res.status(404).send('Expense not found');
  }

  expensesService.remove(id);
  res.sendStatus(204);
};

const updateExpense = (req, res) => {
  const id = Number(req.params.id);
  const currentExpense = expensesService.getById(id);

  if (!currentExpense) {
    return res.status(404).send('Expense not found');
  }

  const validation = expensesService.validateUpdate(req.body);

  if (!validation.status) {
    return res.status(400).send(validation.error);
  }

  const updatedExpense = expensesService.update(id, req.body);

  res.send(updatedExpense);
};

module.exports = {
  getAll,
  getOne,
  createExpense,
  deleteExpense,
  updateExpense,
};
