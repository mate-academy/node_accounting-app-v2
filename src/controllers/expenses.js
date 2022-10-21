'use strict';

const { ExpensesService } = require('../services/expenses');

const initExpensesController = (userController) => {
  const expensesService = new ExpensesService();

  return {
    addExpense(req, res) {
      if (
        !expensesService.isValidExpenseBody(req.body, true)
        || !userController.usersService.getUserById(req.body.userId)
      ) {
        res
          .status(400)
          .send('Bad request');

        return;
      };

      res
        .status(201)
        .send(expensesService.addExpense(req.body));
    },

    getAllExpenses(req, res) {
      res
        .status(200)
        .send(expensesService.getExpensesByQuery(req.query));
    },

    getExpenseById(req, res) {
      if (!req.params.id) {
        res
          .status(400)
          .send('Bad request');

        return;
      };

      const foundExpense = expensesService.getExpenseById(req.params.id);

      if (!foundExpense) {
        res
          .status(404)
          .send('Not found');

        return;
      }

      res
        .status(200)
        .send(foundExpense);
    },

    updateExpenseById(req, res) {
      if (!expensesService.getExpenseById(req.params.id)) {
        res
          .status(404)
          .send('Not found');

        return;
      }

      if (!req.params.id || !expensesService.isValidExpenseBody(req.body)) {
        res
          .status(400)
          .send('Bad request');

        return;
      };

      res
        .status(200)
        .send(expensesService.updateExpenseById(req.params.id, req.body));
    },

    deleteExpenseById(req, res) {
      if (!expensesService.deletExpenseById(req.params.id)) {
        res
          .status(404)
          .send('Not found');

        return;
      }

      res
        .status(204)
        .end();
    },
  };
};

module.exports = { initExpensesController };
