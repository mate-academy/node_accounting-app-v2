const expensesService = require('../services/expenses.service');
const usersService = require('../services/users.service');

async function getAllExpenses(req, res) {
  const { userId, categories, from, to } = req.query;

  const expenses = await expensesService.getAllExpenses({
    userId,
    categories,
    from,
    to,
  });

  res.json(expenses);
}

async function createExpense(req, res) {
  const { userId, spentAt, title, amount, category, note } = req.body;

  if (!userId || !spentAt || !title || !amount || !category) {
    return res.status(400).json({ message: 'Required fields are missing' });
  }

  const user = await usersService.getUserById(Number(userId));

  if (!user) {
    return res.status(400).json({ message: 'User not found' });
  }

  const expenses = await expensesService.createExpenses({
    userId,
    spentAt,
    title,
    amount,
    category,
    note,
  });

  res.status(201).json(expenses);
}

async function getExpensesById(req, res) {
  const { id } = req.params;

  const expense = await expensesService.getExpensesById(id);

  if (!expense) {
    return res.status(404).json({ message: 'Expense not found' });
  }

  return res.status(200).json(expense);
}

async function removeExpenses(req, res) {
  const { id } = req.params;
  const result = await expensesService.removeExpenses(id);

  if (!result) {
    return res.status(404).json({ message: 'Expense not found' });
  }

  return res.sendStatus(204);
}

async function updateExpenses(req, res) {
  const { id } = req.params;
  const { spentAt, title, amount, category, note } = req.body;

  const expense = await expensesService.getExpensesById(Number(id));

  if (!expense) {
    return res.status(404).json({ message: 'Expense not found' });
  }

  const updatedExpense = await expensesService.updateExpenses({
    id,
    spentAt,
    title,
    amount,
    category,
    note,
  });

  if (!updatedExpense) {
    return res.status(404).json({ message: 'Expense not found' });
  }

  res.send(updatedExpense);
}

module.exports = {
  getAllExpenses,
  createExpense,
  getExpensesById,
  removeExpenses,
  updateExpenses,
};
