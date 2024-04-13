const {
  getAll,
  getById,
  create,
  update,
  remove,
} = require('../services/expenses.service');

const getExpenses = (req, res) => {
  const { userId, categories, from, to } = req.query;

  const expenses = getAll({
    userId,
    categories,
    from,
    to,
  });

  res.status(200);
  res.send(expenses);
};

const getExpenseById = (req, res) => {
  const { id } = req.params;

  const expense = getById(id);

  if (!expense) {
    res.status(404);

    res.send('Expense not found');
  }

  res.status(200);
  res.send(expense);
};

const createExpense = (req, res) => {
  const { userId, spentAt, title, amount, category, note } = req.body;

  if (!userId) {
    res.status(400);

    res.send('UserId is required');
  }

  if (!spentAt) {
    res.status(400);

    res.send('SpentAt is required');
  }

  if (!title) {
    res.status(400);

    res.send('Title is required');
  }

  if (!amount) {
    res.status(400);

    res.send('Amount is required');
  }

  if (!category) {
    res.status(400);

    res.send('Category is required');
  }

  const newExpense = create({
    userId,
    spentAt,
    title,
    amount,
    category,
    note,
  });

  res.status(201);
  res.send(newExpense);
};

const updateExpense = (req, res) => {
  const { id } = req.params;
  const data = req.body;

  if (!data) {
    res.status(400);

    res.send(
      // eslint-disable-next-line max-len
      'At least 1 parameter is required - spentAt, title, amount, category, note',
    );
  }

  const expense = getById(id);

  if (!expense) {
    res.status(404);
    res.send('Expense not found');
  }

  const updatedExpense = update(id, data);

  res.status(200);
  res.send(updatedExpense);
};

const removeExpense = (req, res) => {
  const { id } = req.params;

  const expense = getById(id);

  if (!expense) {
    res.status(404);
    res.send('Expense not found');
  }

  const removedExpense = remove(id);

  res.status(204);
  res.send(removedExpense);
};

module.exports = {
  getExpenses,
  getExpenseById,
  createExpense,
  updateExpense,
  removeExpense,
};
