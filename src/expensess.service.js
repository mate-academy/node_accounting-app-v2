/* eslint-disable no-param-reassign */
'use strict';

function initExpencesRoutes(app, { expenses, users }) {
  const findById = (itemsArray, id) => {
    return itemsArray.find(item => item.id === +id);
  };

  const filterById = (itemsArray, value) => {
    return itemsArray.filter(item => item.id !== +value);
  };

  let nextExpensessId = 1;

  app.post('/', (req, res) => {
    const { userId, spentAt, title, amount, category, note } = req.body;

    if (!users.some(user => user.id === userId)) {
      res.sendStatus(400);

      return;
    }

    const newExpensess = {
      id: nextExpensessId++,
      userId,
      spentAt,
      title,
      amount,
      category,
      note,
    };

    expenses.push(newExpensess);

    res.statusCode = 201;
    res.send(newExpensess);
  });

  app.get('/', (req, res) => {
    const { userId, category, from, to } = req.query;

    if (findById(users, userId)) {
      let userExpenses = expenses.filter(
        expense => expense.userId === +userId
      );

      if (category) {
        userExpenses = userExpenses.filter(
          expense => expense.category === category
        );
      }
      res.send(userExpenses);
    }

    if (from && to) {
      const expensesByDate = expenses.filter(
        (expense) => expense.spentAt >= from && expense.spentAt <= to
      );

      res.send(expensesByDate);
    }
    res.send(expenses);
  });

  app.get('/:expensesId', (req, res) => {
    const { expensesId } = req.params;
    const foundExpense = findById(expenses, expensesId);

    if (!foundExpense) {
      res.sendStatus(404);

      return;
    }

    res.sendStatus = 200;
    res.send(foundExpense);
  });

  app.delete('/:expensesId', (req, res) => {
    const { expensesId } = req.params;
    const fieredExpensess = filterById(expenses, expensesId);

    if (users.length === fieredExpensess.length) {
      res.sendStatus(404);

      return;
    }

    expenses = fieredExpensess;
    res.sendStatus(204);
  });

  app.patch('/:expensesId', (req, res) => {
    const { expensesId } = req.params;
    const findExpense = findById(expenses, expensesId);

    if (!findExpense) {
      res.sendStatus(404);

      return;
    };

    const { title } = req.body;

    Object.assign(findExpense, { title });
    res.send(findExpense);
  });
}

module.exports = {
  initExpencesRoutes,
};
