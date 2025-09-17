'use strict';

const ExpenseService = require('../services/expense.service');

module.exports = {
  getAll: (req, res) => {
    const result = ExpenseService.getAll(req.query);

    res.send(result);
  },

  get: (req, res) => {
    const expense = ExpenseService.getById(req.params.id);

    if (!expense) {
      return res.sendStatus(404);
    }

    res.send(expense);
  },

  create: (req, res) => {
    try {
      const newExpense = ExpenseService.create(req.body);

      res.status(201).send(newExpense);
    } catch (err) {
      if (err.message === 'User not found') {
        return res.status(400).send({ message: err.message });
      }
      res.status(400).send({ message: err.message });
    }
  },

  edit: (req, res) => {
    try {
      const updated = ExpenseService.update(req.params.id, req.body);

      res.send(updated);
    } catch (err) {
      if (err.message === 'Expense not found') {
        return res.sendStatus(404);
      }

      res.status(400).send({ message: err.message });
    }
  },

  remove: (req, res) => {
    try {
      ExpenseService.delete(req.params.id);
      res.sendStatus(204);
    } catch (err) {
      if (err.message === 'Expense not found') {
        return res.sendStatus(404);
      }

      res.status(400).send({ message: err.message });
    }
  },
};
