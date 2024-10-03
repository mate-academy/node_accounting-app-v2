const service = require('./expensesServices.js');

const getAllExpenses = async (req, res) => {
  try {
    const expenses = await service.getAllExpenses(req.query);

    res.status(200).json(expenses);
  } catch {
    res.sendStatus(500);
  }
};

const addExpense = async (req, res) => {
  const { userId, spentAt, title, amount, category, note } = req.body;

  try {
    const expense = await service.addExpense(
      userId,
      spentAt,
      title,
      amount,
      category,
      note,
    );

    if (!expense) {
      return res.sendStatus(400);
    }

    res.status(201).json(expense);
  } catch {
    res.sendStatus(500);
  }
};

const getExpenseById = async (req, res) => {
  const expenseId = req.params.id;

  if (!expenseId) {
    return res.sendStatus(400);
  }

  const gottenExpense = await service.getExpenseById(expenseId);

  if (!gottenExpense) {
    return res.sendStatus(404);
  }

  res.status(200).json(gottenExpense);
};

const deleteExpense = async (req, res) => {
  const expenseId = req.params.id;

  if (!expenseId) {
    return res.sendStatus(400);
  }

  const deletedExpense = await service.deleteExpense(expenseId);

  if (!deletedExpense) {
    return res.sendStatus(404);
  }

  res.sendStatus(204);
};

const updateExpense = async (req, res) => {
  const expenseId = req.params.id;
  const updating = req.body;

  if (!expenseId || !updating) {
    return res.sendStatus(400);
  }

  const updatedExpense = await service.updateExpense(expenseId, updating);

  if (!updatedExpense) {
    return res.sendStatus(404);
  }

  res.status(200).json(updatedExpense);
};

module.exports = {
  getAllExpenses,
  addExpense,
  getExpenseById,
  deleteExpense,
  updateExpense,
};
