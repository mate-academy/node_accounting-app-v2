'use strict';

const { Expenses } = require('../services/expenses');

class ExpensesController {
  constructor() {
    this.expensesService = new Expenses();
  }

  getAll(req, res) {
    const normalizedURL = new URL(req.url, `http://${req.headers.host}`);

    const {
      userId,
      category,
      from,
      to,
    } = Object.fromEntries(normalizedURL.searchParams);

    const filteredExpenses = this.expensesService
      .getAll(userId, category, from, to);

    res.send(filteredExpenses);
  }

  getOne(req, res) {
    const { id } = req.params;
    const foundExpense = this.expensesService.getById(id);

    if (!foundExpense) {
      res.sendStatus(404);

      return;
    }

    res.send(foundExpense);
  }

  change(req, res) {
    const { id } = req.params;
    const foundExpense = this.expensesService.getById(id);

    if (!foundExpense) {
      res.sendStatus(404);

      return;
    }

    const { title } = req.body;

    if (typeof title !== 'string') {
      res.sendStatus(422);

      return;
    }

    this.expensesService.update(id, title);

    res.send(foundExpense);
  }

  remove(req, res) {
    const { id } = req.params;
    const foundExpense = this.expensesService.getById(id);

    if (!foundExpense) {
      res.sendStatus(404);

      return;
    }

    this.expensesService.remove(id);
    res.sendStatus(204);
  }
}

module.exports = { ExpensesController };
