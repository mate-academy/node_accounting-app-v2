const services = require('../services/expense.services');
const { getUserByIdService } = require('../services/user.services.js');

const getAllExpenses = (req, res) => {
  const expenses = services.getAllExpenseService(req.query);

  res.json(expenses);
};

const getOneExpense = (req, res) => {
  const { id } = req.params;
  const expense = services.getExpenseByIdService(id);

  if (!expense) {
    res.sendStatus(404);

    return;
  }

  res.json(expense);
};

const createExpense = (req, res) => {
  const { userId, spentAt, title, amount, category, note } = req.body;

  if (!userId || !spentAt || !title || !amount || !category) {
    res.status(400).json({ error: 'Invalid expense data' });

    return;
  }

  const user = getUserByIdService(userId);

  if (!user) {
    res.status(400).json({ error: 'User not found' });

    return;
  }

  const newExpense = services.createExpenseService({
    userId,
    spentAt,
    title,
    amount,
    category,
    note,
  });

  res.status(201);
  res.json(newExpense);
};

const updateExpense = (req, res) => {
  const { id } = req.params;
  const { title } = req.body;
  const expense = services.getExpenseByIdService(id);

  if (!expense) {
    res.sendStatus(404);

    return;
  }

  const updatedExpense = services.updateExpenseService(id, title);

  res.json(updatedExpense);
};

const deleteExpense = (req, res) => {
  const { id } = req.params;
  const expense = services.getExpenseByIdService(id);

  if (!expense) {
    res.sendStatus(404);

    return;
  }

  services.deleteExpenseService(id);
  res.sendStatus(204);
};

module.exports = {
  getAllExpenses,
  getOneExpense,
  createExpense,
  updateExpense,
  deleteExpense,
};
