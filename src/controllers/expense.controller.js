const {
  getAll,
  getById,
  create,
  remove,
  update,
} = require('../services/expense.service');
const { getAll: getAllUsers } = require('../services/user.service');

const parseQueryParameters = (req) => {
  const userId = req.query.userId ? Number(req.query.userId) : null;
  const from = req.query.from ? new Date(req.query.from) : null;
  const to = req.query.to ? new Date(req.query.to) : null;
  const categories = req.query.categories
    ? req.query.categories.split(',')
    : [];

  return {
    userId,
    from,
    to,
    categories,
  };
};

const filterExpenses = (expenses, userId, from, to, categories) => {
  let filteredExpenses = expenses;

  if (userId !== null) {
    filteredExpenses = filteredExpenses.filter(
      (expense) => expense.userId === userId,
    );
  }

  if (from && to) {
    filteredExpenses = filteredExpenses.filter((expense) => {
      const spentAt = new Date(expense.spentAt);

      return spentAt >= from && spentAt <= to;
    });
  }

  if (categories.length > 0) {
    filteredExpenses = filteredExpenses.reduce((acc, expense) => {
      if (categories.includes(expense.category)) {
        acc.push(expense);
      }

      return acc;
    }, []);
  }

  return filteredExpenses;
};

const get = (req, res) => {
  const { userId, from, to, categories } = parseQueryParameters(req);
  let expenses = getAll();

  expenses = filterExpenses(expenses, userId, from, to, categories);
  res.send(expenses);
};

const getByIdController = (req, res) => {
  const { id } = req.params;
  const expense = getById(Number(id));

  if (!expense) {
    res.status(404).send({ message: 'Expense not found' });

    return;
  }
  res.send(expense);
};

const createController = (req, res) => {
  const { userId, spentAt, title, amount, category, note } = req.body;

  if (!userId || !spentAt || !title || amount === undefined || !category) {
    return res.status(400).send({
      message: 'UserId, spentAt, title, amount, and category are required',
    });
  }

  const users = getAllUsers();
  const userExists = users.some((user) => user.id === userId);

  if (!userExists) {
    return res.status(400).send({ message: 'User not found' });
  }

  const expense = create(userId, spentAt, title, amount, category, note);

  res.status(201).send(expense);
};

const removeController = (req, res) => {
  const { id } = req.params;
  const success = remove(Number(id));

  if (!success) {
    res.status(404).send({ message: 'Expense not found' });

    return;
  }
  res.sendStatus(204);
};

const updateController = (req, res) => {
  const { id } = req.params;
  const updates = req.body;

  const expense = update(Number(id), updates);

  if (!expense) {
    res.status(404).send({ message: 'Expense not found' });

    return;
  }
  res.send(expense);
};

module.exports = {
  get,
  getById: getByIdController,
  create: createController,
  remove: removeController,
  update: updateController,
};
