'use strict';

function createExpenseController(userService, expenseService) {
  const getExpense = (req, res) => {
    const { userId, categories, from, to } = req.query;

    const result = expenseService.getAllExpenses(userId, categories, from, to);

    res.send(result);
  };

  const getExpenseById = (req, res) => {
    const { id } = req.params;

    const expense = expenseService.getExpenseById(id);

    if (!expense) {
      return res.sendStatus(404);
    }

    res.send(expense);
  };

  const createExpense = (req, res) => {
    const { spentAt, title, amount, category, note } = req.body;

    if (!spentAt || !title || !amount || !category || !note) {
      return res.sendStatus(400);
    }

    const user = userService.getUserById(req.body.userId);

    if (!user) {
      return res.sendStatus(400);
    }

    const expense = expenseService.createExpense({
      userId: req.body.userId,
      spentAt,
      title,
      amount,
      category,
      note,
    });

    return res.status(201).send(expense);
  };

  const removeExpense = (req, res) => {
    const { id } = req.params;

    if (!expenseService.removeExpense(id)) {
      return res.sendStatus(404);
    }

    res.sendStatus(204);
  };

  const updateExpense = (req, res) => {
    const { id } = req.params;
    const { spentAt, title, amount, category, note } = req.body;

    if (
      (spentAt !== undefined && typeof spentAt !== 'string') ||
      (title !== undefined && typeof title !== 'string') ||
      (amount !== undefined && typeof amount !== 'number') ||
      (category !== undefined && typeof category !== 'string') ||
      (note !== undefined && typeof note !== 'string')
    ) {
      return res.sendStatus(400);
    }

    const updates = {};

    if (spentAt !== undefined) {
      updates.spentAt = spentAt;
    }

    if (title !== undefined) {
      updates.title = title;
    }

    if (amount !== undefined) {
      updates.amount = amount;
    }

    if (category !== undefined) {
      updates.category = category;
    }

    if (note !== undefined) {
      updates.note = note;
    }

    const expense = expenseService.updateExpense(id, updates);

    if (!expense) {
      return res.sendStatus(404);
    }

    res.send(expense);
  };

  return {
    getExpense,
    getExpenseById,
    createExpense,
    removeExpense,
    updateExpense,
  };
}

module.exports = createExpenseController;
