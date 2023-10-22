'use strict';

const expensesServices = require('../Services/expenses');
const userServices = require('../Services/users.js');

module.exports = {
  getAll: (req, res) => res.status(200)
    .send(expensesServices.getAll(req.query)),

  add: (req, res) => !userServices.getUserById(req.body.userId)
    ? res.sendStatus(400)
    : res.status(201).send(expensesServices.createExpense(req.body)),

  getExpense: (req, res) => (expense => !expense
    ? res.sendStatus(404)
    : res.status(200).send(expense)
  )(expensesServices.getById(req.params.expenseId)),

  remove: (req, res) => (expense => {
    return !expense
      ? res.sendStatus(404)
      : expensesServices.remove(req.params.expenseId) && res.sendStatus(204);
  })(expensesServices.getById(req.params.expenseId)),

  update: (req, res) => (expense => !expense
    ? res.sendStatus(404)
    : res.status(200).send(expensesServices
      .updateExpense(req.params.expenseId, req.body))
  )(expensesServices.getById(req.params.expenseId)),
};
