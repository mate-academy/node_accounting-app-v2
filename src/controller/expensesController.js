'use strict';

const { ExpensesService } = require('../services/expenses');
const { usersController } = require('./usersController');

class ExpensesController extends ExpensesService {
  constructor() {
    super();

    this.postExpense = this.postExpense.bind(this);
    this.createExpense = this.createExpense.bind(this);
    this.getExpenses = this.getExpenses.bind(this);
    this.getAll = this.getAll.bind(this);
    this.getExpense = this.getExpense.bind(this);
    this.getOne = this.getOne.bind(this);
    this.removeExpense = this.removeExpense.bind(this);
    this.removeOne = this.removeOne.bind(this);
    this.patchExpense = this.patchExpense.bind(this);
    this.modifyExpence = this.modifyExpence.bind(this);
  }

  postExpense(req, res) {
    const { userId, spentAt, title, amount, category, note } = req.body;

    const users = usersController.getAll();
    const hasUser = users.find(user => +userId === user.id);

    const isValid = hasUser && spentAt && title && amount && category && note;

    const error = hasUser
      ? 'required parameters is not passed'
      : 'user does\'nt exist';

    if (!isValid) {
      res.status(400);
      res.json({ error });

      return;
    }

    const expense = super.createExpense({
      userId, spentAt, title, amount, category, note,
    });

    res.statusCode = 201;
    res.json(expense);
  }

  getExpenses(req, res) {
    const expenses = super.getAll();

    const { userId, category, to, from } = req.query;

    if (from && to) {
      const expensesByDate = expenses.filter(
        (expense) => expense.spentAt > from && expense.spentAt < to
      );

      res.statusCode = 200;
      res.json(expensesByDate);

      return;
    }

    if (userId && category) {
      const expensesByCategoryAndUser = expenses.filter(
        (expense) => (expense.category === category
          && expense.userId === +userId
        ));

      res.statusCode = 200;
      res.json(expensesByCategoryAndUser);

      return;
    }

    if (userId) {
      const expensesByUser = expenses.filter(
        (expense) => expense.userId === +userId
      );

      res.statusCode = 200;
      res.json(expensesByUser);

      return;
    }

    if (category) {
      const expensesByCategory = expenses.filter(
        (expense) => expense.category === category
      );

      res.statusCode = 200;
      res.json(expensesByCategory);

      return;
    }

    res.statusCode = 200;
    res.json(expenses);
  };

  getExpense(req, res) {
    const { expenseId } = req.params;

    if (isNaN(+expenseId)) {
      res.statusCode = 400;
      res.json({ error: 'required parameter is not valid, expected number' });

      return;
    }

    const expenseData = super.getOne(expenseId);

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

    const hasDeleted = super.removeOne(expenseId);

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
      ? 'required parameter is not passed'
      : 'required parameter is not valid, expected number';

    const expense = super.getOne(expenseId);

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

    const data = super.modifyExpence(expenseId, req.body);

    res.statusCode = 200;
    res.json(data);
  };
}

const expensesController = new ExpensesController();

module.exports = {
  expensesController,
};
