'use strict';

function expensesRoute(route, initialUsers, initialExpenses) {
  const availableUsers = initialUsers;
  let availableExpenses = initialExpenses;
  let nextExpenseId = 1;

  route.post('/', (req, res) => {
    const {
      userId,
      spentAt,
      title,
      amount,
      category,
      note,
    } = req.body;

    if (
      isNaN(userId)
      || !availableUsers.some(user => user.id === userId)
      || isNaN(Date.parse(spentAt))
      || typeof title !== 'string'
      || isNaN(amount)
      || typeof category !== 'string'
      || typeof note !== 'string'
    ) {
      res.sendStatus(400);

      return;
    };

    const newExpense = {
      id: nextExpenseId++,
      userId,
      spentAt,
      title,
      amount,
      category,
      note,
    };

    availableExpenses.push(newExpense);

    res
      .status(201)
      .send(newExpense);
  });

  route.get('/', (req, res) => {
    const {
      userId,
      category,
      from,
      to,
    } = req.query;

    if (
      (userId && isNaN(userId))
      || (from && isNaN(Date.parse(from)))
      || (to && isNaN(Date.parse(to)))
      || (category && typeof category !== 'string')
    ) {
      res.sendStatus(400);

      return;
    }

    const filteredExpenses = availableExpenses
      .filter(expense => (
        userId ? expensesRoute.userId === +userId : expense
      ))
      .filter(expense => (
        category ? expense.category === category : expense
      ))
      .filter(expense => (
        from ? new Date(expense.spentAt) > new Date(from) : expense
      ))
      .filter(expense => (
        to ? new Date(expense.spentAt) < new Date(to) : expense
      ));

    res
      .statusCode(200)
      .send(filteredExpenses);
  });

  route.get('/:expenseId', (req, res) => {
    const { expenseId } = req.params;

    if (isNaN(+expenseId)) {
      res.sendStatus(400);

      return;
    }

    const foundExpense = availableExpenses.find(({ id }) => +expenseId === id);

    foundExpense
      ? res
        .statusCode(200)
        .send(foundExpense)
      : res.sendStatus(404);
  });

  route.delete('/:expenseId', (req, res) => {
    const { expenseId } = req.params;

    const filteredExpenses = availableExpenses
      .filter(({ id }) => +expenseId !== id);
    const isDeleted = filteredExpenses.length !== availableExpenses.length;

    availableExpenses = filteredExpenses;

    res.sendStatus(isDeleted ? 204 : 404);
  });

  route.patch('/:expenseId', (req, res) => {
    const { expenseId } = req.params;

    const {
      spentAt,
      title,
      amount,
      category,
      note,
    } = req.body;

    if (
      isNaN(+expenseId)
      || (spentAt && isNaN(Date.parse(spentAt)))
      || (title && typeof title !== 'string')
      || (amount && isNaN(+amount))
      || (category && typeof category !== 'string')
      || (note && typeof note !== 'string')
    ) {
      res
        .status(400)
        .send('Bad request');

      return;
    }

    const foundExpense = availableExpenses.find(({ id }) => +expenseId === id);

    foundExpense
      ? res.send(
        Object.assign(foundExpense, req.body)
      )
      : res.sendStatus(404);
  });
}

module.exports = { expensesRoute };
