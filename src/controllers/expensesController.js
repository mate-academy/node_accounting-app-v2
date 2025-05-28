const {
  getAll,
  getById,
  update,
  create,
  remove,
} = require('../services/expensesService');
const { getById: getUserById } = require('../services/usersService');

const getAllExpenses = async (req, res) => {
  const { userId, from, to, categories } = req.query;

  let expenses = await getAll();

  if (userId) {
    expenses = expenses.filter((expense) => expense.userId === Number(userId));
  }

  if (categories) {
    expenses = expenses.filter((expense) => expense.category === categories);
  }

  if (from || to) {
    expenses = expenses.filter(
      (expense) => expense.spentAt >= from && expense.spentAt <= to,
    );
  }
  res.send(expenses);
};

const getExpenseById = async (req, res) => {
  const id = Number(req.params.id);
  const expense = await getById(id);

  if (!expense) {
    return res.status(404).send('Expense not found');
  }
  res.send(expense);
};

const addExpense = async (req, res) => {
  const { userId, spentAt, title, amount, category, note } = req.body;

  if (!userId || !spentAt || !title || !amount || !category || !note) {
    return res.status(400).send('Missing required fields');
  }

  const user = getUserById(userId);

  if (!user) {
    return res.status(400).send('User not found');
  }

  const expense = await create(userId, spentAt, title, amount, category, note);

  res.status(201).send(expense);
};

const updateExpense = async (req, res) => {
  const id = Number(req.params.id);
  const { userId, spentAt, title, amount, category, note } = req.body;

  const expense = await getById(id);

  if (!expense) {
    return res.status(404).send('Expense not found');
  }

  if (
    (userId && typeof userId !== 'string') ||
    (spentAt && typeof spentAt !== 'string') ||
    (title && typeof title !== 'string') ||
    (amount && typeof amount !== 'number') ||
    (category && typeof category !== 'string') ||
    (note && typeof note !== 'string')
  ) {
    res.sendStatus(422);

    return;
  }

  const updatedexpense = await update({
    id,
    userId: userId || expense.userId,
    spentAt: spentAt || expense.spentAt,
    title: title || expense.title,
    amount: amount || expense.amount,
    category: category || expense.category,
    note: note || expense.note,
  });

  res.send(updatedexpense);
};

const deleteExpense = async (req, res) => {
  const id = Number(req.params.id);

  const expense = await getById(id);

  if (!expense) {
    return res.status(404).send('Expense not found');
  }

  await remove(id);

  res.status(204).send();
};

module.exports = {
  getAllExpenses,
  getExpenseById,
  addExpense,
  updateExpense,
  deleteExpense,
};
