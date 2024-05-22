const {
  createExpenseService,
  getExpensesService,
  getExpenseByIdService,
  updateExpenseService,
  deleteExpenseService,
} = require('../services/expenseService');
const { getUserByIdService } = require('../services/userService');

const createExpense = (req, res) => {
  const { userId, spentAt, title, amount, category, note } = req.body;

  const user = getUserByIdService(userId);

  if (!title || !user) {
    res.sendStatus(400);

    return;
  }

  const newExpense = createExpenseService(
    userId,
    spentAt,
    title,
    amount,
    category,
    note,
  );

  res.status(201).json(newExpense);
};

const getExpenses = (req, res) => {
  const { userId, categories, from, to } = req.query;

  // eslint-disable-next-line no-console
  console.log(userId);

  const filteredExpenses = getExpensesService(userId, categories, from, to);

  // eslint-disable-next-line no-console
  console.log(filteredExpenses);

  res.status(200).send(filteredExpenses);
};

const getExpenseById = (req, res) => {
  const expense = getExpenseByIdService(req.params.id);

  if (!expense) {
    return res.status(404).json({ message: 'Expense not found' });
  }
  res.status(200).json(expense);
};

const updateExpense = (req, res) => {
  const { spentAt, title, amount, category, note } = req.body;
  const expense = updateExpenseService(
    req.params.id,
    spentAt,
    title,
    amount,
    category,
    note,
  );

  if (!expense) {
    res.sendStatus(404);

    return;
  }

  res.status(200).json(expense);
};

const deleteExpense = (req, res) => {
  const success = deleteExpenseService(req.params.id);

  if (!success) {
    return res.status(404).json({ message: 'Expense not found' });
  }
  res.status(204).send();
};

module.exports = {
  createExpense,
  getExpenses,
  getExpenseById,
  updateExpense,
  deleteExpense,
};
