'use strict';

const {
  getExpenseById,
  removeExpense,
} = require('./services/expenses');

const {
  getAllExpenses,
  postOneExpense,
  patchOneExpense,
} = require('./controllers/expenses');

function InitExpenseRoute(app, { users, expenses }) {
  app.post('/', postOneExpense(expenses, users));

  app.get('/', getAllExpenses(expenses, users));

  app.patch('/:id', patchOneExpense(expenses));

  app.get('/:id', (req, res) => {
    const { id } = req.params;
    const foundExpense = getExpenseById(expenses, +id);

    if (!foundExpense) {
      res.sendStatus(404);

      return;
    }

    res.statusCode = 200;
    res.send(foundExpense);
  });

  app.delete('/:id', (req, res) => {
    const { id } = req.params;
    const foundExpense = getExpenseById(expenses, +id);

    if (!foundExpense) {
      res.sendStatus(404);

      return;
    }

    // eslint-disable-next-line no-param-reassign
    expenses = removeExpense(expenses, +id);
    res.sendStatus(204);
  });
}

module.exports = {
  InitExpenseRoute,
};
