'use strict';

const { Expenses } = require('../services/expenses');

class ExpensesController {
  constructor() {
    this.expensesService = new Expenses();

    this.getAll = (req, res) => {
      const normalizedURL = new URL(req.url, `http://${req.headers.host}`);

      const {
        userId,
        from,
        to,
      } = Object.fromEntries(normalizedURL.searchParams);

      const categories = normalizedURL.searchParams.getAll('category');

      const filteredExpenses = this.expensesService
        .getAll(userId, categories, from, to);

      res.send(filteredExpenses);
    };

    this.getOne = (req, res) => {
      const { id } = req.params;
      const foundExpense = this.expensesService.getById(id);

      if (!foundExpense) {
        res.sendStatus(404);

        return;
      }

      res.send(foundExpense);
    };

    this.change = (req, res) => {
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
    };

    this.remove = (req, res) => {
      const { id } = req.params;
      const foundExpense = this.expensesService.getById(id);

      if (!foundExpense) {
        res.sendStatus(404);

        return;
      }

      this.expensesService.remove(id);
      res.sendStatus(204);
    };
  }
}

module.exports = { ExpensesController };
