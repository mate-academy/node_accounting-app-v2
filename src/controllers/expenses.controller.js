const { errorHandler } = require('../helpers/errorHandler');
const {
  expensesService,
  initExpensesService,
} = require('../services/expenses.service');
const { STATUS_CODES } = require('../variables/variables');
const express = require('express');

const expensesController = () => {
  initExpensesService();

  const expensesRoutes = express.Router();

  expensesRoutes.get('/', (req, res) => {
    const params = req.query;

    const expenses = expensesService.getExpenses(params);

    res.status(STATUS_CODES.ok).send(expenses);
  });

  expensesRoutes.post('/', (req, res) => {
    try {
      const expenses = req.body;

      const newExpenses = expensesService.createExpenses(expenses);

      res.status(STATUS_CODES.created).send(newExpenses);
    } catch (err) {
      errorHandler(err, res);
    }
  });

  expensesRoutes.get('/:id', (req, res) => {
    try {
      const id = req.params.id;

      const expenses = expensesService.getExpensesById(+id);

      res.status(STATUS_CODES.ok).send(expenses);
    } catch (err) {
      errorHandler(err, res);
    }
  });

  expensesRoutes.delete('/:id', (req, res) => {
    try {
      const id = req.params.id;

      expensesService.deleteExpenses(+id);
      res.status(STATUS_CODES.noContent).end();
    } catch (err) {
      errorHandler(err, res);
    }
  });

  expensesRoutes.patch('/:id', (req, res) => {
    try {
      const id = req.params.id;
      const params = req.body;

      const updatedExpenses = expensesService.updateExpenses(+id, params);

      res.status(STATUS_CODES.ok).send(updatedExpenses);
    } catch (err) {
      errorHandler(err, res);
    }
  });

  return expensesRoutes;
};

module.exports = {
  expensesController,
};
