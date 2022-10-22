'use strict';

function expensePoints(app, { users }, { expenses }) {
  let newExpenseID = 1;

  app.get('/', (req, res) => {
    const { userId, category, from, to } = req.query;

    let getExpenses = [...expenses];

    if (userId) {
      getExpenses = [...getExpenses].filter(expense => (
        expense.userId === Number(userId)
      ));

      if (category) {
        getExpenses = [...getExpenses].filter(expense => (
          category.includes(expense.category)
        ));
      }

      res
        .status(200)
        .send(getExpenses);
    }

    if (from && to) {
      getExpenses = [...getExpenses].filter(expense => (
        new Date(from) < new Date(expense.spentAt)
        && new Date(to) > new Date(expense.spentAt)
      ));
    }

    res
      .status(200)
      .send(getExpenses.length === 0 ? [] : getExpenses);
  });

  app.get('/:id', (req, res) => {
    const { id } = req.params;
    const foundExpense = expenses.find(expense => expense.id === +id);

    if (!id) {
      res
        .status(400)
        .send('ID of expense is requered');

      return;
    }

    if (!foundExpense) {
      res
        .status(404)
        .send('Expenses is not found');

      return;
    }

    res
      .status(200)
      .send(foundExpense);
  });

  app.patch('/:id', (req, res) => {
    const { id } = req.params;
    const newExpense = expenses.find(expense => expense.id === +id);

    if (!id) {
      res
        .status(400)
        .send('ID of expense is requered');

      return;
    }

    if (!newExpense) {
      res
        .status(404)
        .send('Expense is not found');

      return;
    }

    const {
      spentAt,
      title,
      amount,
      category,
      note,
    } = req.body;

    const updateKeys = {
      spentAt,
      title,
      amount,
      category,
      note,
    };

    for (const key in updateKeys) {
      if (!updateKeys[key]) {
        delete updateKeys[key];
      }
    };

    Object.assign(newExpense, updateKeys);

    res
      .status(200)
      .send(newExpense);
  });

  app.post('/', (req, res) => {
    const {
      userId,
      spentAt,
      title,
      amount,
      category,
      note,
    } = req.body;

    const foundUser = users[Number(userId)];

    if (!foundUser) {
      res
        .status(400)
        .send('Name is not provided');

      return;
    }

    const newExpense = Object.assign({
      userId,
      spentAt,
      title,
      amount,
      category,
      note,
    }, { id: newExpenseID++ });

    expenses.push(newExpense);

    res
      .status(201)
      .send(newExpense);
  });

  app.delete('/:id', (req, res) => {
    const { id } = req.params;
    const deleteExpense = expenses.find(exp => exp.id === +id);

    expenses.splice(expenses.indexOf(deleteExpense), 1);

    if (!deleteExpense) {
      res.sendStatus(404);
      res.send('Expense is not found');

      return;
    }

    expenses.splice(id, 1);

    res
      .status(204)
      .send(deleteExpense);
  });
}
module.exports = { expensePoints };
