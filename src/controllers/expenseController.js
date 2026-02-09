'use strict';

class ExpenseController {
  constructor(expenseService, userService) {
    this.expenseService = expenseService;
    this.userService = userService;
  }

  isValidId(id) {
    return Number.isInteger(id) && id > 0;
  }

  getAllExpenses(req, res) {
    const { userId, categories, from, to } = req.query;

    const filters = {};

    if (userId !== undefined) {
      filters.userId = Number(userId);
    }

    if (categories) {
      filters.categories = categories;
    }

    if (from) {
      filters.from = from;
    }

    if (to) {
      filters.to = to;
    }

    const expenses = this.expenseService.getAllExpenses(filters);

    res.json(expenses);
  }

  createExpense(req, res) {
    const { userId, spentAt, title, amount, category, note } = req.body;

    if (
      userId === undefined ||
      !spentAt ||
      !title ||
      amount === undefined ||
      !category
    ) {
      return res.status(400).send('Bad request');
    }

    if (!this.userService.userExists(userId)) {
      return res.status(400).send('Bad request');
    }

    const expense = this.expenseService.createExpense({
      userId,
      spentAt,
      title,
      amount,
      category,
      note,
    });

    res.status(201).json(expense);
  }

  getExpenseById(req, res) {
    const id = Number(req.params.id);

    if (!this.isValidId(id)) {
      return res.status(400).send('Bad request');
    }

    const expense = this.expenseService.getExpenseById(id);

    if (!expense) {
      return res.status(404).send('Not found');
    }

    res.json(expense);
  }

  updateExpense(req, res) {
    const id = Number(req.params.id);

    if (!this.isValidId(id)) {
      return res.status(400).send('Bad request');
    }

    const existing = this.expenseService.getExpenseById(id);

    if (!existing) {
      return res.status(404).send('Not found');
    }

    if (Object.keys(req.body).length === 0) {
      return res.status(400).send('Bad request');
    }

    const expense = this.expenseService.updateExpense(id, req.body);

    res.json(expense);
  }

  deleteExpense(req, res) {
    const id = Number(req.params.id);

    if (!this.isValidId(id)) {
      return res.status(400).send('Bad request');
    }

    const deleted = this.expenseService.deleteExpense(id);

    if (!deleted) {
      return res.status(404).send('Not found');
    }

    res.sendStatus(204);
  }
}

module.exports = ExpenseController;
