const {
  getAllExpenses,
  getExpensesById,
  createExpense,
  updateExpense,
  deleteExpense,
} = require('../services/expenses.services.js');
const { getUserById } = require('../services/users.services.js');

const getAll = (req, res) => {
  const { userId, categories, from, to } = req.query;

  res.send(getAllExpenses(userId, categories, from, to));
};

const getOne = (req, res) => {
  const { id } = req.params;
  const expense = getExpensesById(id);

  if (!expense) {
    res.status(404).send({ error: 'Expense not found' });

    return;
  }

  res.send(expense);
};

const create = (req, res) => {
  const { userId, spentAt, title, amount, category, note } = req.body;
  const user = getUserById(userId);

  if (!user || !title) {
    res.sendStatus(400);

    return;
  }

  const newExpense = createExpense(
    userId,
    spentAt,
    title,
    amount,
    category,
    note,
  );

  res.statusCode = 201;
  res.send(newExpense);
};

const update = (req, res) => {
  const { id } = req.params;

  const expense = getExpensesById(id);

  if (!expense) {
    res.sendStatus(404).send({ error: 'Expense not found' });

    return;
  }

  const updatedExpense = updateExpense(id, req.body);

  res.send(updatedExpense);
};

const deleteOne = (req, res) => {
  const { id } = req.params;
  const expense = getExpensesById(id);

  if (!expense) {
    res.sendStatus(404).send({ error: 'Expense not found' });

    return;
  }
  deleteExpense(id);
  res.sendStatus(204);
};

module.exports = {
  getAll,
  getOne,
  create,
  update,
  deleteOne,
};
