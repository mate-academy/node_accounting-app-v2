'use strict';

const { expensesService } = require('./expenses.service');

const expensesController = {
  getAll(request, response) {
    const expenses = expensesService.getAll(request.query);

    response.status(200).send(expenses);
  },
  getById(request, response) {
    const { expenseId } = request.params;
    const foundExpense = expensesService.getById(Number(expenseId));

    if (!foundExpense) {
      response.sendStatus(404);

      return;
    }

    response.status(200).send(foundExpense);
  },
  create(request, response) {
    const isExpenseValid = expensesService.isExpenseValid(request.body);

    if (!isExpenseValid) {
      response.sendStatus(400);

      return;
    }

    const newExpense = expensesService.create(request.body);

    response.statusCode = 201;
    response.send(newExpense);
  },
  update(request, response) {
    const { expenseId } = request.params;
    const isUpdateValid = expensesService.isUpdateValid(request.body);
    const foundExpense = expensesService.getById(Number(expenseId));

    if (!foundExpense) {
      response.sendStatus(404);

      return;
    }

    if (!isUpdateValid) {
      response.sendStatus(400);

      return;
    }

    const updateExpense = expensesService.update(
      Number(expenseId),
      request.body,
    );

    response.status(200).send(updateExpense);
  },
  delete(request, response) {
    const { expenseId } = request.params;
    const foundExpense = expensesService.getById(Number(expenseId));

    if (!foundExpense) {
      response.sendStatus(404);

      return;
    }

    expensesService.delete(Number(expenseId));

    response.sendStatus(204);
  },
};

module.exports = { expensesController };
