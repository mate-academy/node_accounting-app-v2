const {
  getFilteredExpenses,
  addExpense,
  getExpenseById,
  getExpenseByIdIndex,
  removeExpenseById,
} = require('../services/expenses.service');

const { getUserById } = require('../services/users.service');

const getFilteredExpense = (req, res) => {
  const { userId, from, to, categories } = req.query;

  const expense = getFilteredExpenses({
    userId,
    from,
    to,
    categories,
  });

  return res.status(200).send(expense);
};

const setExpense = (req, res) => {
  const { userId, spentAt, title, amount, category, note } = req.body;

  const userExists = getUserById(userId);

  if (!title || !userExists) {
    return res.sendStatus(400);
  }

  const newExpense = addExpense({
    userId,
    spentAt,
    title,
    amount,
    category,
    note,
  });

  res.status(201).send(newExpense);
};

const getCurrentExpense = (req, res) => {
  const { id } = req.params;

  const currentExpense = getExpenseById(id);

  if (!currentExpense) {
    return res.sendStatus(404);
  }

  return res.status(200).send(currentExpense);
};

const deleteExpense = (req, res) => {
  const { id } = req.params;

  const expenseIndex = getExpenseByIdIndex(id);

  if (expenseIndex === -1) {
    return res.sendStatus(404);
  }

  removeExpenseById(id);

  return res.sendStatus(204);
};

const updateExpense = (req, res) => {
  const { id } = req.params;
  const { spentAt, title, amount, category, note } = req.body;
  const currentExpense = getExpenseById(id);

  if (!currentExpense) {
    res.status(404).send('Not found');
  }

  if (spentAt) {
    currentExpense.spentAt = spentAt;
  }

  if (title) {
    currentExpense.title = title;
  }

  if (amount) {
    currentExpense.amount = amount;
  }

  if (category) {
    currentExpense.category = category;
  }

  if (note) {
    currentExpense.note = note;
  }

  res.send(currentExpense);
};

module.exports = {
  getFilteredExpense,
  setExpense,
  getCurrentExpense,
  deleteExpense,
  updateExpense,
};
