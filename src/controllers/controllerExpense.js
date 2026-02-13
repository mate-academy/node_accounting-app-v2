const expenseService = require('../services/serviceExpenses');
const userService = require('../services/serviceUsers');

const getAll = (req, res) => {
  const { userId, categories, from, to } = req.query;

  const expenses = expenseService.getAllExpenses(userId, categories, from, to);

  res.json(expenses);
};

const getById = (req, res) => {
  const { id } = req.params;
  const expense = expenseService.getExpenseById(id);

  if (!expense) {
    return res.status(404).send('Expense not found');
  }

  res.json(expense);
};

const create = (req, res) => {
  const { userId, spentAt, title, amount, category, note } = req.body;

  if (!userId || !spentAt || !title || amount === undefined || !category) {
    return res
      .status(400)
      .send(
        'All fields are required: userId, spentAt, title, amount, category',
      );
  }

  const user = userService.getUserById(Number(userId));

  if (!user) {
    return res.status(400).send('User not found');
  }

  const expense = expenseService.createExpense(
    Number(userId),
    spentAt,
    title,
    amount,
    category,
    note,
  );

  res.status(201).json(expense);
};

const update = (req, res) => {
  const { id } = req.params;

  const existingExpense = expenseService.getExpenseById(id);

  if (!existingExpense) {
    return res.status(404).send('Expense not found');
  }

  const updates = req.body;
  const expense = expenseService.updateExpense(id, updates);

  res.json(expense);
};

const remove = (req, res) => {
  const { id } = req.params;
  const deleted = expenseService.deleteExpense(id);

  if (!deleted) {
    return res.status(404).send('Expense not found');
  }

  res.sendStatus(204);
};

module.exports = {
  getAll,
  getById,
  create,
  update,
  remove,
};
