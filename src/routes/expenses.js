'use strict';

function expenseRoute(router, initialUsers, initialExpenses) {
  let nextExpenseId = 1;
  let expenses = initialExpenses;
  const users = initialUsers;

  router.post('/', (req, res) => {
    const {
      userId,
      spentAt,
      title,
      amount,
      category,
      note,
    } = req.body;

    const dateIsInvalid
      = isNaN(+userId)
        || !users.some(user => user.id === userId)
        || isNaN(+userId)
        || isNaN(Date.parse(spentAt))
        || typeof title !== 'string'
        || isNaN(+amount)
        || typeof category !== 'string'
        || typeof note !== 'string';

    if (dateIsInvalid) {
      res.sendStatus(400);

      return;
    };

    const newExpenses = {
      id: nextExpenseId++,
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

  router.get('/', (req, res) => {
    const {
      userId,
      category,
      from,
      to,
    } = req.query;

    const dateIsInvalid
      = (userId && isNaN(+userId))
        || (from && isNaN(Date.parse(from)))
        || (to && isNaN(Date.parse(to)))
        || (category && typeof category !== 'string');

    if (dateIsInvalid) {
      res.sendStatus(400);

      return;
    }

    const filteredExpenses = expenses
      .filter(expense => (
        userId ? expense.userId === +userId : expense
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

    res.send(filteredExpenses);
  });

  router.get('/:expenseId', (req, res) => {
    const { expenseId } = req.params;

    if (isNaN(+expenseId)) {
      res.sendStatus(400);

      return;
    }

    const foundExpense = expenses.find(({ id }) => +expenseId === id);

    foundExpense ? res.send(foundExpense) : res.sendStatus(404);
  });

  router.delete('/:expenseId', (req, res) => {
    const { expenseId } = req.params;

    if (isNaN(+expenseId)) {
      res.sendStatus(400);

      return;
    }

    const filteredExpenses = expenses.filter(({ id }) => +expenseId !== id);
    const isExpenseFound = expenses.length !== filteredExpenses.length;

    expenses = filteredExpenses;

    res.sendStatus(isExpenseFound ? 204 : 404);
  });

  router.patch('/:expenseId', (req, res) => {
    const { expenseId } = req.params;
    const {
      spentAt,
      title,
      amount,
      category,
      note,
    } = req.body;

    const dateIsInvalid
    = isNaN(+expenseId)
      || (spentAt && isNaN(Date.parse(spentAt)))
      || (title && typeof title !== 'string')
      || (amount && isNaN(+amount))
      || (category && typeof category !== 'string')
      || (note && typeof note !== 'string');

    if (dateIsInvalid) {
      res.sendStatus(400);

      return;
    }

    const foundExpense = expenses.find(({ id }) => +expenseId === id);

    if (!foundExpense) {
      res.sendStatus(404);

      return;
    }

    Object.assign(foundExpense, req.body);

    res.send(foundExpense);
  });
};

module.exports = { expenseRoute };
