const expensesService = require('../services/expenses.services');

const getExpenses = (req, res) => {
  const { userId, categories, from, to } = req.query;

  if (!req.query) {
    return res.status(400).send('Bad request');
  }

  const result = expensesService.getFilteredExpenses(
    userId,
    categories,
    from,
    to,
  );

  res.status(200).send(result);
};

const createExpense = (req, res) => {
  const { userId, spentAt, title, amount, category, note } = req.body;

  if (!userId || !spentAt || !title || !amount || !category || !note) {
    return res.status(400).send('Bad Request');
  }

  const newExpense = expensesService.create(
    userId,
    spentAt,
    title,
    amount,
    category,
    note,
  );

  if (!newExpense) {
    return res.status(400).send('Bad Request');
  }

  return res.status(201).send(newExpense);
};

const getExpenseById = (req, res) => {
  const expensId = Number(req.params.id);

  if (Number.isNaN(expensId)) {
    return res.status(400).send('Bad Request');
  }

  const searchedExpense = expensesService.getById(expensId);

  if (!searchedExpense) {
    return res.status(404).send('Not Found');
  }

  res.status(200).send(searchedExpense);
};

const deletExpense = (req, res) => {
  const expenseId = Number(req.params.id);

  const deletedExpense = expensesService.remove(expenseId);

  if (!deletedExpense) {
    return res.status(404).send('Not Found');
  }

  res.status(204).send();
};

const updateExpense = (req, res) => {
  const expenseId = Number(req.params.id);

  if (Number.isNaN(expenseId)) {
    return res.status(400).send('Bad Request');
  }

  const updatedExpense = expensesService.update(expenseId, req.body);

  if (!updatedExpense) {
    return res.status(404).send('Not Found');
  }

  res.status(200).send(updatedExpense);
};

module.exports = {
  getExpenses,
  createExpense,
  getExpenseById,
  deletExpense,
  updateExpense,
};
