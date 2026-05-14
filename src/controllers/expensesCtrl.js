'use strict';

const expensesService = require('../services/expensesSvc');
const usersService = require('../services/usersSvc');

const expensesController = {
  create(req, res) {
    const { userId, spentAt, title, amount, category, note } = req.body;

    // Check if required fields are provided
    if (
      userId === undefined ||
      !spentAt ||
      !title ||
      amount === undefined ||
      !category ||
      !note
    ) {
      res.status(400).json({ error: 'missing required fields' });

      return;
    }

    // Check if user exists
    const user = usersService.getById(userId);

    if (!user) {
      res.status(404).json({ error: 'user not found' });

      return;
    }

    const expense = expensesService.create({
      userId,
      spentAt,
      title,
      amount,
      category,
      note,
    });

    res.status(201).json(expense);
  },

  getAll(req, res) {
    const { userId, from, to, categories } = req.query;

    const filters = {};

    if (userId) {
      filters.userId = Number(userId);
    }

    if (from) {
      filters.from = from;
    }

    if (to) {
      filters.to = to;
    }

    if (categories) {
      filters.categories = categories.split(',').map((c) => c.trim());
    }

    const expenses = expensesService.getAll(filters);

    res.status(200).json(expenses);
  },

  getById(req, res) {
    const { id } = req.params;
    const expense = expensesService.getById(Number(id));

    if (!expense) {
      res.status(404).json({ error: 'expense not found' });

      return;
    }

    res.status(200).json(expense);
  },

  update(req, res) {
    const { id } = req.params;
    const expense = expensesService.update(Number(id), req.body);

    if (!expense) {
      res.status(404).json({ error: 'expense not found' });

      return;
    }

    res.status(200).json(expense);
  },

  delete(req, res) {
    const { id } = req.params;
    const deleted = expensesService.delete(Number(id));

    if (!deleted) {
      res.status(404).json({ error: 'expense not found' });

      return;
    }

    res.status(204).send();
  },
};

module.exports = expensesController;
