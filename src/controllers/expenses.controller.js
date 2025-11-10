'use strict';

function getExpensesById(req, res) {
  const expenses = req.app.locals.expenses;
  const expense = expenses.find((e) => e.id === Number(req.params.id));

  if (!expense) {
    return res.status(404).send('Expense not found');
  }
  res.json(expense);
}

function patchExpensesById(req, res) {
  const expenses = req.app.locals.expenses;
  const expense = expenses.find((e) => e.id === Number(req.params.id));

  if (!expense) {
    return res.status(404).send('Expense not found');
  }

  Object.assign(expense, req.body);
  res.json(expense);
}

function deleteExpensesById(req, res) {
  const expenses = req.app.locals.expenses;
  const index = expenses.findIndex((e) => e.id === Number(req.params.id));

  if (index === -1) {
    return res.status(404).send('Expense not found');
  }

  expenses.splice(index, 1);
  res.status(204).send();
}

module.exports = { getExpensesById, patchExpensesById, deleteExpensesById };
