'use strict';

function InitExpenseRoute(app, { users, expenses }) {
  app.post('/', (req, res) => {
    const {
      userId,
      spentAt,
      title,
      amount,
      category,
      note,
    } = req.body;

    const foundUser = users.find((user) => user.id === +userId);

    if (!foundUser) {
      res.sendStatus(400);

      return;
    };

    const newExpenses = {
      id: Math.random(),
      userId,
      spentAt,
      title,
      amount,
      category,
      note,
    };

    expenses.push(newExpenses);
    res.statusCode = 201;
    res.send(newExpenses);
  });

  app.get('/', (req, res) => {
    const {
      userId,
      category,
      from,
      to,
    } = req.query;

    const id = +userId;

    if (typeof id !== 'number') {
      res.sendStatus(400);

      return;
    }

    const foundUser = users.find(user => user.id === id);

    if (foundUser) {
      const expensesFilteredByUser = expenses
        .filter(expense => expense.userId === id);

      if (category) {
        const expensesFilteredByCat = expensesFilteredByUser
          .filter(expense => expense.category === category);

        res.send(expensesFilteredByCat);

        return;
      }

      res.send(expensesFilteredByUser);

      return;
    }

    if (from && to) {
      const expensesFilteredByDate = expenses.filter(
        (expense) => expense.spentAt >= from && expense.spentAt <= to);

      res.send(expensesFilteredByDate);

      return;
    }

    res.send(expenses);
  });

  app.patch('/:id', (req, res) => {
    const { id } = req.params;

    if (typeof +id !== 'number') {
      res.sendStatus(400);

      return;
    };

    const foundExpense = expenses.find(expense => expense.id === +id);

    if (!foundExpense) {
      res.sendStatus(404);

      return;
    };

    Object.assign(foundExpense, req.body);
    res.send(foundExpense);
  });

  app.get('/:id', (req, res) => {
    const { id } = req.params;
    const foundExpense = expenses.find(expense => expense.id === +id);

    if (!foundExpense) {
      res.sendStatus(404);

      return;
    }

    res.statusCode = 200;
    res.send(foundExpense);
  });

  app.delete('/:id', (req, res) => {
    const { id } = req.params;
    const filteredExpenses = expenses.filter(expens => expens.id !== +id);

    if (filteredExpenses.length === expenses.length) {
      res.sendStatus(404);

      return;
    }

    // eslint-disable-next-line no-param-reassign
    expenses = filteredExpenses;
    res.sendStatus(204);
  });
}

module.exports = {
  InitExpenseRoute,
};
