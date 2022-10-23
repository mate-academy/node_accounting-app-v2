'use strict';

const { expensesServices } = { ...require('../services/expenses.js') };
const { userServices } = { ...require('../services/users') };

const expenseController = {
  getAll: (req, res) => {
    const userId = req.query.userId;
    const category = req.query.category;
    const from = req.query.from;
    const to = req.query.to;
    let vizibleExpenses = expensesServices.getAll();

    if (userId) {
      vizibleExpenses = vizibleExpenses
        .filter(expense => expense.userId === +userId);
    };

    if (category) {
      vizibleExpenses = vizibleExpenses
        .filter(expense => expense.category === category);
    }

    if (from) {
      vizibleExpenses = vizibleExpenses
        .filter(expense => expense.spentAt >= from && expense.spentAt <= to);
    }

    res.send(vizibleExpenses);
  },
  getOne: (req, res) => {
    const id = req.params.expenseId;
    const findExpense = expensesServices.getOne(id);

    if (!findExpense) {
      res.sendStatus(404);

      return;
    }

    res.statusCode = 200;
    res.send(findExpense);
  },
  create: (req, res) => {
    const body = req.body;
    const { userId } = body;
    const newExpense = expensesServices.create(body);

    if (!newExpense) {
      res.sendStatus(400);

      return;
    }

    if (!userServices.getOne(userId)) {
      res.sendStatus(400);

      return;
    }

    res.statusCode = 201;
    res.send(newExpense);
  },
  remove: (req, res) => {
    const id = req.params.expenseId;

    const filteredExpenses = expensesServices.remove(id);

    if (!filteredExpenses) {
      res.sendStatus(404);

      return;
    }

    res.statusCode = 204;
    res.send(filteredExpenses);
  },
  update: (req, res) => {
    const expenseId = req.params.expenseId;
    const findExpense = expensesServices.getOne(expenseId);

    if (!findExpense) {
      res.sendStatus(404);

      return;
    }

    const { title } = req.body;

    Object.assign(findExpense, {
      title,
    });

    res.send(findExpense);
  },
  reset: expensesServices.reset,
};

module.exports = {
  expenseController,
};
