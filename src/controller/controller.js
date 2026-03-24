const {
  findById,
  filterById,
  createUserObject,
  checkExpense,
} = require('../services/services.js');

const users = [];
const expenses = [];

const resetData = () => {
  users.splice(0, users.length);
  expenses.splice(0, expenses.length);
};

const getUsers = (req, res) => {
  res.setHeader('Content-Type', 'application/json');

  res.statusCode = 200;
  res.send(users);
};

const getSingleUser = (req, res) => {
  res.setHeader('Content-Type', 'application/json');

  const { id } = req.params;

  const user = findById(users, id);

  if (user) {
    res.statusCode = 200;
    res.send(user);
  } else {
    res.statusCode = 404;
    res.send({ error: 'User not found!' });
  }
};

const createUser = (req, res) => {
  res.setHeader('Content-Type', 'application/json');

  const { name } = req.body;

  if (!name) {
    res.statusCode = 400;
    res.send({ error: 'Bad request!' });

    return;
  }

  const user = createUserObject(users, name);

  res.statusCode = 201;
  res.send(user);
};

const deleteUser = (req, res) => {
  res.setHeader('Content-Type', 'application/json');

  const { id } = req.params;

  const user = findById(users, id);

  if (!user) {
    res.statusCode = 404;
    res.send({ error: 'User not found!' });

    return;
  }

  users.splice(0, users.length, ...filterById(users, id));

  res.statusCode = 204;
  res.end();
};

const updateUser = (req, res) => {
  res.setHeader('Content-Type', 'application/json');

  const { id } = req.params;
  const { name } = req.body;

  const user = findById(users, id);

  if (!user) {
    res.statusCode = 404;
    res.send({ error: 'User not found!' });

    return;
  }

  if (name) {
    user.name = name;
  }

  res.statusCode = 200;
  res.send(user);
};

const getExpenses = (req, res) => {
  res.setHeader('Content-Type', 'application/json');

  const { userId, from, to, categories } = req.query;

  const filteredExpenses = checkExpense(userId, from, to, categories, expenses);

  res.statusCode = 200;
  res.send(filteredExpenses);
};

const getSingleExpense = (req, res) => {
  res.setHeader('Content-Type', 'application/json');

  const { id } = req.params;

  const expense = findById(expenses, id);

  if (!expense) {
    res.statusCode = 404;
    res.send({ error: 'Expense not found!' });

    return;
  }

  res.statusCode = 200;
  res.send(expense);
};

const createExpense = (req, res) => {
  res.setHeader('Content-Type', 'application/json');

  const { userId, title, amount, category, note, spentAt } = req.body;

  if (!userId || !title || !amount || !category || !note) {
    res.statusCode = 400;
    res.send({ error: 'Bad request!' });

    return;
  }

  const user = findById(users, userId);

  if (!user) {
    res.statusCode = 400;
    res.send({ error: 'User not found!' });

    return;
  }

  const expense = {
    id: expenses.length + 1,
    userId,
    spentAt: spentAt || new Date().toISOString(),
    title,
    amount,
    category,
    note,
  };

  expenses.push(expense);

  res.statusCode = 201;
  res.send(expense);
};

const deleteExpense = (req, res) => {
  res.setHeader('Content-Type', 'application/json');

  const { id } = req.params;

  const expense = findById(expenses, id);

  if (!expense) {
    res.statusCode = 404;
    res.send({ error: 'Expense not found!' });

    return;
  }

  expenses.splice(0, expenses.length, ...filterById(expenses, id));
  res.statusCode = 204;
  res.end();
};

const updateExpense = (req, res) => {
  res.setHeader('Content-Type', 'application/json');

  const { id } = req.params;
  const { title, amount, category, note, spentAt } = req.body;

  const expense = findById(expenses, id);

  if (!expense) {
    res.statusCode = 404;
    res.send({ error: 'Expense not found!' });

    return;
  }

  if (title !== undefined) {
    expense.title = title;
  }

  if (amount !== undefined) {
    expense.amount = amount;
  }

  if (category !== undefined) {
    expense.category = category;
  }

  if (note !== undefined) {
    expense.note = note;
  }

  if (spentAt !== undefined) {
    expense.spentAt = spentAt;
  }

  res.statusCode = 200;
  res.send(expense);
};

module.exports = {
  createUser,
  getUsers,
  deleteUser,
  getSingleUser,
  updateUser,
  getExpenses,
  getSingleExpense,
  createExpense,
  deleteExpense,
  updateExpense,
  resetData,
};
