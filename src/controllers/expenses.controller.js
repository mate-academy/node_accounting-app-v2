const { expensesService } = require('../services/expense.services.js');
const { usersService } = require('../services/user.services.js');

const getExpenses = (req, res) => {
  const { userId, categories, from, to } = req.query;
  const categoryList = categories ? categories.split(',') : [];

  const expenses = expensesService.getExpenses({
    userId,
    categoryList,
    from,
    to,
  });

  res.json(expenses);
};

const createExpense = (req, res) => {
  const { userId, spentAt, title, amount, category, note } = req.body;

  if (!userId || !spentAt || !title || !amount || !category || !note) {
    return res.status(400).json({ message: 'Missing required parameters' });
  }

  const user = usersService.getUserById(userId);

  if (!user) {
    return res.status(400).json({ message: 'User not found' });
  }

  const expense = expensesService.createExpense({
    userId,
    spentAt,
    title,
    amount,
    category,
    note,
  });

  res.status(201).json(expense);
};

const getExpenseById = (req, res) => {
  const expense = expensesService.getExpenseById(+req.params.id);

  if (!expense) {
    return res.status(404).json({ message: 'Expense not found' });
  }

  res.json(expense);
};

const deleteExpenseById = (req, res) => {
  const expense = expensesService.deleteExpenseById(+req.params.id);

  if (!expense) {
    return res.status(404).json({ message: 'Expense not found' });
  }

  return res.sendStatus(204);
};

const updateExpenseById = (req, res) => {
  const data = req.body;

  const expense = expensesService.getExpenseById(+req.params.id);

  if (!expense) {
    return res.status(404).json({ message: 'Expense not found' });
  }

  const updatedExpense = expensesService.updateExpenseById({
    id: +req.params.id,
    data,
  });

  res.json(updatedExpense);
};

module.exports = {
  createExpense,
  getExpenses,
  deleteExpenseById,
  getExpenseById,
  updateExpenseById,
};
