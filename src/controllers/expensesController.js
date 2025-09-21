const expensesService = require('../services/expensesService');

const userService = require('../services/usersService');

function getExpenses(req, res) {
  const result = expensesService.getAllExpenses(req.query);

  res.status(200).send(result);
}

function createExpense(req, res) {
  const { userId, spentAt, title, amount, category, note } = req.body;

  if (!userId || !title || !amount || !category) {
    return res.status(400).send({ message: 'Missing required fields' });
  }

  const user = userService.getById(userId);

  if (!user) {
    return res.sendStatus(400);
  }

  const newExpense = expensesService.createExpense({
    userId,
    spentAt,
    title,
    amount,
    category,
    note,
  });

  res.status(201).send(newExpense);
}

function getExpense(req, res) {
  const expense = expensesService.getExpenseById(req.params.id);

  if (!expense) {
    return res.sendStatus(404);
  }
  res.status(200).send(expense);
}

function deleteExpense(req, res) {
  const deleted = expensesService.deleteExpense(req.params.id);

  if (!deleted) {
    return res.sendStatus(404);
  }
  res.sendStatus(204);
}

function updateExpense(req, res) {
  const updated = expensesService.updateExpense(req.params.id, req.body);

  if (!updated) {
    return res.sendStatus(404);
  }
  res.status(200).send(updated);
}

module.exports = {
  getExpenses,
  createExpense,
  getExpense,
  deleteExpense,
  updateExpense,
};
