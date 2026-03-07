const { getUser } = require('../services/users.service');
const {
  getAllExpenses,
  getExpense,
  createExpense: createExpenseService,
  updateExpense: updateExpenseService,
  deleteExpense: deleteExpenseService,
} = require('../services/expenses.service');

const getExpenses = (req, res) => {
  const expenses = getAllExpenses(req.query);

  res.json(expenses);
};

const getExpenseById = (req, res) => {
  const idNumber = Number(req.params.id);

  if (isNaN(idNumber)) {
    return res.status(400).json({ error: 'ID should be a number' });
  }

  const expense = getExpense(idNumber);

  if (!expense) {
    return res.status(404).json({ error: 'Expense not found' });
  }

  res.json(expense);
};

const createNewExpense = (req, res) => {
  const { userId, spentAt, title, amount, category, note } = req.body;

  if (
    !userId ||
    !spentAt ||
    !title ||
    amount === undefined ||
    !category ||
    !note
  ) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  const user = getUser(userId);

  if (!user) {
    return res.status(400).json({ error: 'User not found' });
  }

  const expense = createExpenseService({
    userId,
    spentAt,
    title,
    amount,
    category,
    note,
  });

  res.status(201).json(expense);
};

const updateExpenseById = (req, res) => {
  const idNumber = Number(req.params.id);

  if (isNaN(idNumber)) {
    return res.status(400).json({ error: 'ID should be a number' });
  }

  const expense = updateExpenseService(idNumber, req.body);

  if (!expense) {
    return res.status(404).json({ error: 'Expense not found' });
  }

  res.json(expense);
};

const deleteExpenseById = (req, res) => {
  const idNumber = Number(req.params.id);

  if (isNaN(idNumber)) {
    return res.status(400).json({ error: 'ID should be a number' });
  }

  const deleted = deleteExpenseService(idNumber);

  if (!deleted) {
    return res.status(404).json({ error: 'Expense not found' });
  }

  res.sendStatus(204);
};

module.exports = {
  getExpenses,
  getExpenseById,
  createNewExpense,
  updateExpenseById,
  deleteExpenseById,
};
