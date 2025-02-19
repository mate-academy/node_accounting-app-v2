const expenseService = require('../service/expenses.service');

const getExpenses = (req, res) => {
  const expense = expenseService.getExpenses(req.query);

  if (!expense) {
    return res.status(404).json({ message: 'NOT FOUND' });
  }

  return res.status(200).json(expense);
};

const createExpense = (req, res) => {
  const newExpense = expenseService.createExpense(req.body);

  if (newExpense === null) {
    return res.status(400).json({
      message:
        "'userId','title','amount' and 'category' content MUST BE filled",
    });
  }

  if (newExpense === undefined) {
    return res.status(400).json({
      message: 'Bad Request, user not found',
    });
  }

  return res.status(201).json(newExpense);
};

const getExpenseById = (req, res) => {
  const { id } = req.params;

  const findExpense = expenseService.getExpenseById(id);

  if (!findExpense) {
    return res.status(404).json({ message: 'Expense not found' });
  }

  return res.status(200).json(findExpense);
};

const deleteExpenseById = (req, res) => {
  const { id } = req.params;
  const findExpense = expenseService.deleteExpenseById(id);

  if (!findExpense) {
    return res.status(404).json({ message: 'Expense not found' });
  }

  return res.status(204).end();
};

const updateExpense = (req, res) => {
  const { id } = req.params;

  const update = expenseService.updateExpense(req.body, id);

  if (!update) {
    return res.status(404).json({ message: 'Expense not found' });
  }

  return res.status(200).json(update);
};

module.exports = {
  getExpenses,
  createExpense,
  getExpenseById,
  deleteExpenseById,
  updateExpense,
};
