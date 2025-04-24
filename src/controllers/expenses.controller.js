const {
  getAll,
  add,
  get,
  remove,
  update,
} = require('../services/expenses.services');

const expensesService = require('../services/expenses.services');

const getExpenses = (req, res) => {
  // let { userId, categories, from, to } = req.query;

  // if (!userId || isNaN(+userId)) {
  //   return res.status(400).json({ message: 'Invalid or missing userId' });
  // }

  // let filtered = data.expenses.filter((exp) => exp.userId === +userId);

  // if (categories) {
  //   const catArray = Array.isArray(categories) ? categories : [categories];
  //   filtered = filtered.filter((exp) => catArray.includes(exp.category));
  // }

  // if (from) {
  //   const fromDate = new Date(from);
  //   if (isNaN(fromDate)) {
  //     return res.status(400).json({ message: 'Invalid "from" date' });
  //   }
  //   filtered = filtered.filter((exp) => new Date(exp.spentAt) >= fromDate);
  // }

  // if (to) {
  //   const toDate = new Date(to);
  //   if (isNaN(toDate)) {
  //     return res.status(400).json({ message: 'Invalid "to" date' });
  //   }
  //   filtered = filtered.filter((exp) => new Date(exp.spentAt) <= toDate);
  // }

  // res.status(200).json(filtered || []);

  const queries = req.query;

  const allExpenses = getAll(queries);

  return res.status(200).send(allExpenses);
};

const createExpense = (req, res) => {
  const queries = req.body;
  const { userId, spentAt, title, amount, category, note } = queries;

  if (
    userId === undefined ||
    spentAt === undefined ||
    title === undefined ||
    amount === undefined ||
    category === undefined
  ) {
    return res.status(400).send('Some of props are not filled');
  }

  const newExpense = add(queries);

  if (!newExpense) {
    res.sendStatus(400);
  }

  res.status(201).json(newExpense);
};

const getExpense = (req, res) => {
  const { id } = req.params;

  if (!id || isNaN(+id)) {
    return res.status(400).send('Bad request');
  }

  const expense = get(+id);

  if (!expense) {
    return res.status(404).send('Not Found');
  }

  res.status(200).json(expense);
};

const removeExpense = (req, res) => {
  const id = req.params.id;

  const expense = remove(+id);

  if (!expense) {
    return res.status(404).send('Not found');
  }

  res.status(204).send();
};

const updateExpense = (req, res) => {
  const { id } = req.params;
  const expense = req.body;

  if (!id || isNaN(+id)) {
    return res.status(400).send('Bad request2');
  }

  if (Object.keys(expense).length === 0) {
    return res.status(400).send('Bad request1');
  }

  if (!expensesService.get(+id)) {
    return res.status(404).send('Not found');
  }

  let foundExpense = update(+id, expense);

  // if (!foundExpense) {
  //   return res.status(404).send('Not found');
  // }

  res.status(200).json(foundExpense);
};

module.exports = {
  getExpenses,
  createExpense,
  getExpense,
  removeExpense,
  updateExpense,
};
