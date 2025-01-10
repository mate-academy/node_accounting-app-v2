const expensesService = require('../services/expenses.service');

const getAllExpenses = (req, res) => {
  const { userId, categories, from, to } = req.query;

  const expenses = expensesService.getAllExpenses(
    userId,
    categories ? categories.split(',') : null,
    from,
    to,
  );

  res.status(200).json(expenses);
};

const getExpenseById = (req, res) => {
  const { id } = req.params;
  const expense = expensesService.getExpenseById(+id);

  if (!expense) {
    return res.status(404).json({ message: 'Expense not found' });
  }

  res.status(200).json(expense);
};

const createExpense = (req, res) => {
  const { userId, spentAt, title, amount, category, note } = req.body;

  if (!userId || !spentAt || !title || !amount || !category || !note) {
    return res.status(400).send('Missing required fields');
  }

  try {
    const expenses = expensesService.createExpense({
      userId,
      spentAt,
      title,
      amount,
      category,
      note,
    });

    res.status(201).json(expenses);
  } catch (error) {
    res.status(400).send(error.message);
  }
};

const deleteExpense = (req, res) => {
  const { id } = req.params;
  const expense = expensesService.deleteExpense(+id);

  if (!expense) {
    return res.status(404).json({ message: 'Expense not found' });
  }

  res.status(204).json(expense);
};

const updateExpense = (req, res) => {
  const { id } = req.params;
  const updatedExpense = req.body;
  const expense = expensesService.updateExpense(+id, updatedExpense);

  if (!expense) {
    return res.status(404).json({ message: 'Expense not found' });
  }

  res.status(200).json(expense);
};

const expensesController = {
  getAllExpenses,
  getExpenseById,
  createExpense,
  deleteExpense,
  updateExpense,
};

module.exports = expensesController;
