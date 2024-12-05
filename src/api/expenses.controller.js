const { expensesService } = require('../services/expenses.service.js');
const { usersService } = require('../services/users.service.js');

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
    return res.sendStatus(400);
  }

  const user = usersService.getUserById(userId);

  if (!user) {
    return res.sendStatus(400);
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
    return res.sendStatus(404);
  }

  res.json(expense);
};

const deleteExpenseById = (req, res) => {
  const expense = expensesService.deleteExpenseById(+req.params.id);

  if (!expense) {
    return res.sendStatus(404);
  }

  return res.sendStatus(204);
};

const updateExpenseById = (req, res) => {
  const data = req.body;
  const expense = expensesService.getExpenseById(+req.params.id);

  if (!expense) {
    return res.sendStatus(404);
  }

  const updatedExpense = expensesService.updateExpenseById({
    id: +req.params.id,
    data,
  });

  res.json(updatedExpense);
};

const expensesController = {
  getExpenses,
  createExpense,
  getExpenseById,
  deleteExpenseById,
  updateExpenseById,
};

module.exports = {
  expensesController,
};
