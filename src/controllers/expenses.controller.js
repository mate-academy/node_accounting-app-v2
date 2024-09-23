const expensesServices = require('../services/expenses.service.js');
const usersServices = require('../services/users.service.js');

const getAllExpenses = (req, res) => {
  const { userId, categories, from, to } = req.query;

  res.send(expensesServices.allExpenses(userId, categories, from, to));
};

const getExpenseById = (req, res) => {
  const { id } = req.params;
  const expenseById = expensesServices.expenseById(id);

  if (!expenseById) {
    res.sendStatus(404);

    return;
  }

  res.send(expenseById);
};

const createExpense = (req, res) => {
  const { userId, title, amount, category, spentAt } = req.body;
  const user = usersServices.userById(userId);

  if (!user) {
    res.sendStatus(400);

    return;
  }

  if (!userId || !title || !amount || !category || !spentAt) {
    res.sendStatus(400);

    return;
  }

  const newExpense = expensesServices.createExpense({
    userId,
    spentAt,
    title,
    amount,
    category,
    note: req.body.note || '',
  });

  res.status(201).send(newExpense);
};

const deleteExpense = (req, res) => {
  const { id } = req.params;

  if (!expensesServices.expenseById(id)) {
    res.sendStatus(404);

    return;
  }

  expensesServices.deleteExpense(id);

  res.sendStatus(204);
};

const updateExpense = (req, res) => {
  const { id } = req.params;
  const { spentAt, title, amount, category, note } = req.body;

  const expenseById = expensesServices.expenseById(id);

  if (!expenseById) {
    res.sendStatus(404);

    return;
  }

  const updatedExpense = expensesServices.updateExpense(id, {
    spentAt,
    title,
    amount,
    category,
    note,
  });

  res.send(updatedExpense);
};

module.exports = {
  getAllExpenses,
  getExpenseById,
  createExpense,
  deleteExpense,
  updateExpense,
};
