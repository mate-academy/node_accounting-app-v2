'use strict';

const { expensesService } = require('../services/expenses');
const { usersService } = require('../services/users');

class ExpensesController {
  postExpense(req, res) {
    const {
      userId, spentAt, title, amount, category, note,
    } = req.body;

    const hasUser = usersService.getOne(+userId);

    const isValid = hasUser && spentAt && title && amount && category && note;

    if (!isValid) {
      const error = hasUser
        ? 'one or more required parameters is not passed'
        : 'user does\'nt exist';

      res.status(400);
      res.json({ error });

      return;
    }

    const expense = expensesService.createExpense({
      userId, spentAt, title, amount, category, note,
    });

    res.statusCode = 201;
    res.json(expense);
  }

  getExpenses(req, res) {
    const expenses = expensesService.getAll(req.query);

    res.statusCode = 200;
    res.json(expenses);
  };

  getExpense(req, res) {
    const { expenseId } = req.params;

    if (isNaN(+expenseId)) {
      res.statusCode = 400;
      res.json({ error: 'request parameter is not valid, expected number' });

      return;
    }

    const expenseData = expensesService.getOne(expenseId);

    if (!expenseData) {
      res.statusCode = 404;
      res.json({ error: 'expected entity doesn\'t exist' });

      return;
    }

    res.statusCode = 200;
    res.json(expenseData);
  };

  removeExpense(req, res) {
    const { expenseId } = req.params;

    const hasDeleted = expensesService.removeOne(expenseId);

    if (!hasDeleted) {
      res.statusCode = 404;
      res.json({ error: 'expected entity doesn\'t exist' });

      return;
    }

    res.sendStatus(204);
  };

  patchExpense(req, res) {
    const { expenseId } = req.params;
    const { spentAt, title, amount, category, note } = req.body;

    const isValid = spentAt || title || amount || category || note;

    const error = !isValid
      ? 'at least one parameter should be passed'
      : 'request parameter is not valid, expected number';

    const expense = expensesService.getOne(expenseId);

    if (!expense) {
      res.statusCode = 404;
      res.json({ error: 'expected entity doesn\'t exist' });

      return;
    }

    if (!isValid) {
      res.status(400);
      res.json({ error });

      return;
    }

    const data = expensesService.modifyExpence(expenseId, req.body);

    res.statusCode = 200;
    res.json(data);
  };
}

const expensesController = new ExpensesController();

module.exports = {
  expensesController,
};
