const expenseService = require('../services/expenses.service');
const userService = require('../services/users.service');

exports.getExpenses = (req, res) => {
  const { userId, categories, from, to } = req.query;

  let result = expenseService.getExpenses();

  if (userId) {
    result = result.filter((e) => e.userId === Number(userId));
  }

  if (categories) {
    const list = Array.isArray(categories) ? categories : categories.split(',');

    result = result.filter((e) => list.includes(e.category));
  }

  if (from) {
    result = result.filter((e) => new Date(e.spentAt) >= new Date(from));
  }

  if (to) {
    result = result.filter((e) => new Date(e.spentAt) <= new Date(to));
  }

  res.json(result);
};

exports.createExpense = (req, res) => {
  const { userId, amount, category, title, note, spentAt } = req.body;

  if (
    userId === undefined ||
    typeof amount !== 'number' ||
    !category ||
    !title ||
    !spentAt
  ) {
    return res.status(400).json({ error: 'Bad request' });
  }

  const user = userService.getUserById(Number(userId));

  if (!user) {
    return res.status(400).json({ error: 'User not found' });
  }

  const expense = expenseService.createExpense({
    userId: Number(userId),
    amount,
    category,
    title,
    note,
    spentAt,
  });

  res.status(201).json(expense);
};

exports.getExpenseById = (req, res) => {
  const id = Number(req.params.id);
  const expense = expenseService.getExpenseById(id);

  if (!expense) {
    return res.status(404).json({ error: 'Expense not found' });
  }

  res.json(expense);
};

exports.deleteExpenseById = (req, res) => {
  const id = Number(req.params.id);
  const deleted = expenseService.deleteExpenseById(id);

  if (!deleted) {
    return res.status(404).json({ error: 'Not found' });
  }

  res.status(204).send();
};

exports.updateExpenseById = (req, res) => {
  const id = Number(req.params.id);

  const expense = expenseService.getExpenseById(id);

  if (!expense) {
    return res.status(404).json({ error: 'Expense not found' });
  }

  const data = req.body;

  if (!data || !Object.keys(data).length) {
    return res.status(400).json({ error: 'Bad request' });
  }

  const updated = expenseService.updateExpenseById(id, data);

  res.json(updated);
};
