const expensesService = require('../services/expenses.service');
const userService = require('../services/users.service');

// const isValidISODate = (dateString) => {
//   return !isNaN(Date.parse(dateString));
// };

// isValidISODate('2015-07-20T15:49:04-07:00');

const getExpenses = (req, res) => {
  const {
    // id,
    userId,
    categories,
    from,
    to,
  } = req.query;

  // if (!userId || isNaN(+userId)) {
  //   res.sendStatus(400);

  //   return;
  // }

  // expensesService.getExpenses();

  const filteredExpenses = expensesService.getExpenses(
    userId !== undefined ? Number(userId) : undefined,
    categories,
    from,
    to,
  );

  res.status(200).send(filteredExpenses);
};

const getExpense = (req, res) => {
  const { id } = req.params;
  const fixedId = +id;

  if (isNaN(fixedId)) {
    res.sendStatus(400);

    return;
  }

  const expense = expensesService.getExpense(fixedId);

  if (!expense) {
    res.sendStatus(404);

    return;
  }

  res.status(200).send(expense);
};

const deleteExpense = (req, res) => {
  const { id } = req.params;
  // console.log(id);

  const fixedId = +id;

  if (isNaN(fixedId)) {
    res.sendStatus(400);

    return;
  }

  const expense = expensesService.getExpense(fixedId);

  if (!expense) {
    res.sendStatus(404);

    return;
  }

  expensesService.deleteExpense(fixedId);

  res.sendStatus(204);
};

const updateExpense = (req, res) => {
  const { id } = req.params;
  const { spentAt, title, amount, category, note } = req.body;

  const fixedId = +id;

  if (isNaN(fixedId)) {
    res.sendStatus(400);

    return;
  }

  if (!expensesService.getExpense(fixedId)) {
    res.sendStatus(404);

    return;
  }

  const fieldsToUpdate = {};

  if (spentAt) {
    fieldsToUpdate.spentAt = spentAt;
  }

  if (title) {
    fieldsToUpdate.title = title;
  }

  if (amount) {
    fieldsToUpdate.amount = amount;
  }

  if (category) {
    fieldsToUpdate.category = category;
  }

  if (note) {
    fieldsToUpdate.note = note;
  }

  const updatedExpense = expensesService.updateExpense(fixedId, fieldsToUpdate);

  res.status(200).send(updatedExpense);
};

const createExpense = (req, res) => {
  const { userId, spentAt, title, amount, category, note } = req.body;

  if (
    userId === undefined ||
    spentAt === undefined ||
    title === undefined ||
    amount === undefined ||
    category === undefined
  ) {
    // console.log(userId, spentAt, title, amount, category, note, 'wtf');
    res.status(400).send('Some of props are not filled');

    return;
  }

  // const fixedId = +userId;

  // if (isNaN(fixedId)) {
  //   res.sendStatus(400);

  //   return;
  // }

  if (!userService.getUser(userId)) {
    res.sendStatus(400);

    return;
  }

  const newExpenseData = {
    // userId: fixedId,
    userId,
    spentAt,
    title,
    amount,
    category,
    note,
  };

  const newExpense = expensesService.createExpense(newExpenseData);

  res.status(201).send(newExpense);
};

// const getByUserId = (req, res) => {
//   const {
//     // id,
//     userId,
//     categories,
//     from,
//     to,
//   } = req.query;
// };

// id,
// userId,
// spentAt,
// title,
// amount,
// category,
// note,

module.exports = {
  getExpenses,
  getExpense,
  deleteExpense,
  updateExpense,
  createExpense,
};
