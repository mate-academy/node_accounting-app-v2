'use strict';

const expenseServise = require('../services/expenses.js');
const userServise = require('../services/users.js');

const post = (req, res) => {
  const {
    userId,
    title,
  } = req.body;

  if (!title || !userServise.exist(userId)) {
    res.sendStatus(400);

    return;
  }

  const newExpense = {
    ...req.body,
    id: Math.floor(Date.now() * Math.random()),
  };

  expenseServise.add(newExpense);
  res.statusCode = 201;
  res.send(newExpense);
};

const get = (req, res) => {
  const expenses = expenseServise.getAll();
  const {
    userId,
    category,
    from,
    to,
  } = req.query;

  if (typeof +userId !== 'number') {
    res.sendStatus(400);

    return;
  };

  if (expenses.length === 0) {
    res.send([]);
  };

  const userIdExpensed = userServise.findById(+userId);

  if (userIdExpensed) {
    let userExpenses = expenseServise.filter(
      expense => expense.userId === +userId
    );

    if (category) {
      userExpenses = userExpenses.filter(
        expense => expense.category === category
      );
    }

    res.send(userExpenses);

    return;
  }

  if (from || to) {
    const expensesBetweenDate = expenses.filter(
      (expense) => expense.spentAt >= from && expense.spentAt <= to);

    res.send(expensesBetweenDate);

    return;
  }

  res.send(expenseServise.getAll());
};

const getId = (req, res) => {
  const expenseId = Number(req.params.id);

  if (typeof expenseId !== 'number') {
    res.sendStatus(400);

    return;
  }

  const foundExpense = expenseServise.findById(expenseId);

  if (!foundExpense) {
    res.sendStatus(404);

    return;
  }

  res.statusCode = 200;

  res.send(foundExpense);
};

const patch = (req, res) => {
  const { id } = req.params;

  if (typeof +id !== 'number') {
    res.sendStatus(400);

    return;
  }

  const foundExpense = expenseServise.findById(+id);

  if (!foundExpense) {
    res.sendStatus(404);

    return;
  }

  expenseServise.update(foundExpense, req.body);
  res.send(foundExpense);
};

const deleteExpense = (req, res) => {
  const { id } = req.params;

  const foundExpense = expenseServise.findById(+id);

  if (!foundExpense) {
    res.sendStatus(404);

    return;
  };

  expenseServise.remove(+id);
  res.sendStatus(204);
};

module.exports = {
  post,
  get,
  getId,
  patch,
  deleteExpense,
};

// 'use strict';

// const { getById } = require('../service/users');

// const {
//   getExpenseByCategory, getExpenseById, getExpenseByUser,
//   getExpenseByTime, createExpense, removeExpense, updateExpense,
// } = require('../service/expenses');

// function InitExpenseRoute(app, { users, expenses }) {
//   app.post('/', (req, res) => {
//     const {
//       userId,
//       spentAt,
//       title,
//       category,
//       amount,
//       note,
//     } = req.body;

//     const foundUser = getById(users, userId);

//     if (!foundUser) {
//       res.sendStatus(400);

//       return;
//     }

//     const newExpenses = createExpense(
//       expenses, userId, spentAt, title, category, amount, note);

//     res.statusCode = 201;
//     res.send(newExpenses);
//   });

//   app.get('/', (req, res) => {
//     const {
//       userId,
//       category,
//       from,
//       to,
//     } = req.query;

//     const id = userId;

//     if (typeof id !== 'number') {
//       res.sendStatus(400);

//       return;
//     }

//     const foundUser = getById(users, id);

//     if (foundUser) {
//       const expensesFilteredByUser = getExpenseByUser(expenses, id);

//       if (category) {
//         const expensesFilteredByCategory = getExpenseByCategory(
//           expensesFilteredByUser, category);

//         res.send(expensesFilteredByCategory);

//         return;
//       }

//       res.send(expensesFilteredByUser);

//       return;
//     }

//     if (from && to) {
//       const expensesFilteredByDate = getExpenseByTime(expenses, from, to);

//       res.send(expensesFilteredByDate);

//       return;
//     }

//     res.send(expenses);
//   });

//   app.patch('/:id', (req, res) => {
//     const { id } = req.params;

//     if (typeof id !== 'number') {
//       res.sendStatus(400);

//       return;
//     };

//     const foundExpense = getExpenseById(expenses, id);

//     if (!foundExpense) {
//       res.sendStatus(404);

//       return;
//     };

//     const body = req.body;

//     updateExpense(expenses, id, body);

//     res.send(foundExpense);
//     res.sendStatus(200);
//   });

//   app.get('/:id', (req, res) => {
//     const { id } = req.params;
//     const foundExpense = getExpenseById(expenses, id);

//     if (!foundExpense) {
//       res.sendStatus(404);

//       return;
//     }

//     res.statusCode = 200;
//     res.send(foundExpense);
//   });

//   app.delete('/:id', (req, res) => {
//     const { id } = req.params;
//     const foundExpense = getExpenseById(expenses, id);

//     if (!foundExpense) {
//       res.sendStatus(404);

//       return;
//     }

//     // eslint-disable-next-line no-param-reassign
//     expenses = removeExpense(expenses, id);
//     res.sendStatus(204);
//   });
// };

// module.exports = {
//   InitExpenseRoute,
// };
