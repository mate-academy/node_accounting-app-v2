const expensesService = require('../services/expenses.service');
const userService = require('../services/user.service');

// Get all expenses
const getAll = (req, res) => {
  const { userId, categories, from, to } = req.query;
  let expenses = expensesService.getAllExpenses();

  if (userId) {
    expenses = expenses.filter((expense) => expense.userId === +userId);
  }

  if (categories) {
    expenses = expenses.filter((e) => e.category === categories);
  }

  if (from) {
    expenses = expenses.filter(
      (expense) => new Date(expense.spentAt) >= new Date(from),
    );
  }

  if (to) {
    expenses = expenses.filter(
      (expense) => new Date(expense.spentAt) <= new Date(to),
    );
  }

  res.status(200).send(expenses);
};

// Get one expense
const getExpense = (req, res) => {
  const { id } = req.params;

  if (Number.isNaN(Number(id))) {
    res.status(400).send('Write correct data');

    return;
  }

  const expense = expensesService.getExpense(+id);

  if (!expense) {
    res.status(404).send({ message: 'Expense does not exist' });

    return;
  }

  res.status(200).send(expense);
};

// Create new expense
const createExpense = (req, res) => {
  const { userId, spentAt, title, amount, category, note } = req.body;

  if (
    typeof +userId !== 'number' ||
    typeof spentAt !== 'string' ||
    typeof title !== 'string' ||
    typeof amount !== 'number' ||
    typeof category !== 'string' ||
    typeof note !== 'string' ||
    !userService.getUser(+userId)
  ) {
    return res.status(400).send({ message: 'Missing required fields' });
  }

  const newExpense = expensesService.createExpenses(req.body);

  res.status(201).send(newExpense);
};

// Update expense
const updateExpense = (req, res) => {
  const { id } = req.params;
  const body = req.body;
  const numId = Number(id);

  if (Number.isNaN(numId)) {
    return res.status(400).send('Write correct data');
  }

  const existing = expensesService.getExpense(numId);

  if (!existing) {
    return res.status(404).send('Not found');
  }

  const updatedExpense = expensesService.updateExpenses(numId, body);

  res.status(200).send(updatedExpense);
};

// Delete expense
const deleteExpense = (req, res) => {
  const { id } = req.params;

  if (!expensesService.getExpense(+id) || Number.isNaN(+id)) {
    return res.status(404).send({ message: 'Expense not found' });
  }

  expensesService.deleteExpenses(+id);
  res.status(204).send();
};

module.exports = {
  getAll,
  getExpense,
  createExpense,
  updateExpense,
  deleteExpense,
};
