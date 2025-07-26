const expensesService = require('../services/expensesService');
const userService = require('../services/userService');

const getExpenses = async (req, res) => {
  let result = await expensesService.getExpenses();
  const { userId, categories, from, to } = req.query;

  if (userId) {
    result = result.filter(
      (e) => e.userId === userId || e.userId === Number(userId),
    );
  }

  if (categories) {
    const cats = Array.isArray(categories) ? categories : [categories];

    result = result.filter((e) => cats.includes(e.category));
  }

  if (from) {
    const fromDate = new Date(from);

    result = result.filter((e) => new Date(e.spentAt) >= fromDate);
  }

  if (to) {
    const toDate = new Date(to);

    result = result.filter((e) => new Date(e.spentAt) <= toDate);
  }

  res.json(result);
};

const getExpenseById = async (req, res) => {
  const id = Number(req.params.id);
  const expense = await expensesService.getExpenseById(id);

  if (!expense) {
    return res.sendStatus(404);
  }
  res.json(expense);
};

const createExpense = async (req, res) => {
  const { userId, spentAt, title, amount, category, note } = req.body;

  if (!userId || !spentAt || !title || amount === undefined || !category) {
    return res.status(400).send('Missing required fields');
  }

  const user = await userService.getUserById(userId);

  if (!user) {
    return res.status(400).send('User not found');
  }

  const expense = await expensesService.createExpense({
    userId,
    spentAt,
    title,
    amount,
    category,
    note: note || '',
  });

  if (!expense) {
    return res.status(400).send('Failed to create expense');
  }

  res.status(201).json(expense);
};

const updateExpense = async (req, res) => {
  const id = Number(req.params.id);
  const expense = await expensesService.getExpenseById(id);

  if (!expense) {
    return res.sendStatus(404);
  }

  const { spentAt, title, amount, category, note } = req.body;

  const updatedExpense = await expensesService.updateExpense(id, {
    userId: expense.userId,
    spentAt,
    title,
    amount,
    category,
    note,
  });

  if (!updatedExpense) {
    return res.sendStatus(404);
  }

  res.json(updatedExpense);
};

const deleteExpense = async (req, res) => {
  const id = Number(req.params.id);
  const expense = await expensesService.getExpenseById(id);

  if (!expense) {
    return res.sendStatus(404);
  }
  await expensesService.deleteExpense(id);
  res.sendStatus(204);
};

module.exports = {
  getExpenses,
  getExpenseById,
  createExpense,
  updateExpense,
  deleteExpense,
};
