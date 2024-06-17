const expensesService = require('../services/expenses.service');

const getExpenses = (req, res) => {
  const { userId, categories, from, to } = req.query;
  const arrCategories =
    categories && !Array.isArray(categories) ? [categories] : categories;

  try {
    const expenses = expensesService.getExpenses(
      +userId,
      arrCategories,
      from,
      to,
    );

    res.send(expenses);
  } catch (error) {
    res.status(400).send(error.message);
  }
};

const getOneExpense = (req, res) => {
  const { id } = req.params;

  const expense = expensesService.getExpense(+id);

  if (expense) {
    res.send(expense);
  } else {
    res.sendStatus(404);
  }
};

const addExpense = (req, res) => {
  const expenseData = req.body;

  try {
    const expense = expensesService.addExpense(expenseData);

    res.status(201).send(expense);
  } catch (error) {
    res.status(400).send(error.message);
  }
};

const updateExpense = (req, res) => {
  const expenseData = req.body;
  const { id } = req.params;

  try {
    const expense = expensesService.updateExpense(+id, expenseData);

    if (expense) {
      res.send(expense);
    } else {
      res.sendStatus(404);
    }
  } catch (error) {
    res.status(400).send(error.message);
  }
};

const deleteExpense = (req, res) => {
  const { id } = req.params;
  const didSucceed = expensesService.deleteExpense(+id);

  if (didSucceed) {
    res.sendStatus(204);
  } else {
    res.sendStatus(404);
  }
};

module.exports = {
  getExpenses,
  getOneExpense,
  addExpense,
  deleteExpense,
  updateExpense,
};
