const expenseService = require('../services/expense.service');

function getAll(req, res) {
  const { userId, categories, from, to } = req.query;
  const categoriesArr =
    categories && !Array.isArray(categories) ? [categories] : categories;

  try {
    const expenses = expenseService.getExpenses(
      +userId,
      categoriesArr,
      from,
      to,
    );

    res.send(expenses);
  } catch (e) {
    res.status(400).send(e.message);
  }
}

function getOne(req, res) {
  const { id } = req.params;

  const expense = expenseService.getExpense(+id);

  if (expense) {
    res.send(expense);
  } else {
    res.sendStatus(404);
  }
}

function createOne(req, res) {
  const expenseData = req.body;

  try {
    const expense = expenseService.createExpense(expenseData);

    res.status(201).send(expense);
  } catch (e) {
    res.status(400).send(e.message);
  }
}

function updateOne(req, res) {
  const { id } = req.params;
  const expenseData = req.body;

  try {
    const expense = expenseService.updateExpense(+id, expenseData);

    if (!expense) {
      res.sendStatus(404);
    } else {
      res.send(expense);
    }
  } catch (e) {
    res.status(400).send(e.message);
  }
}

function deleteOne(req, res) {
  const { id } = req.params;

  const success = expenseService.deleteExpense(+id);

  if (success) {
    res.sendStatus(204);
  } else {
    res.sendStatus(404);
  }
}

module.exports = {
  getAll,
  getOne,
  createOne,
  deleteOne,
  updateOne,
};
