const expensesService = require('../services/expenses.service');
const usersService = require('../services/users.service');

const getAll = (req, res) => {
  const { userId, categories, from, to } = req.query;
  const categoriesArray = categories
    ? categories.split(',').map((cat) => cat.trim())
    : undefined;
  const expenses = expensesService.getAll({
    userId,
    categories: categoriesArray,
    from,
    to,
  });

  res.status(200).json(expenses);
};

const getById = (req, res) => {
  const id = req.params.id;

  if (!id) {
    res.status(400).send('Bad Request');

    return;
  }

  const expense = expensesService.getById(id);

  if (!expense) {
    res.status(404).send('Not Found');

    return;
  }

  res.status(200).json(expense);
};

const create = (req, res) => {
  const { userId, spentAt, title, amount, category, note } = req.body;

  if (!userId || !spentAt || !title || !amount || !category || !note) {
    res.status(400).send('Bad Request!');

    return;
  }

  const user = usersService.getById(userId);

  if (!user) {
    res.status(400).send('User not found');

    return;
  }

  const expense = expensesService.create({
    userId,
    spentAt,
    title,
    amount,
    category,
    note,
  });

  if (expense === null) {
    res.status(400).send('Bad Request');

    return;
  }

  res.status(201).json(expense);
};

const deleteById = (req, res) => {
  const id = req.params.id;
  const expense = expensesService.deleteById(id);

  if (expense === null) {
    res.status(404).send('Not Found');

    return;
  }

  res.status(204).send();
};

const update = (req, res) => {
  const id = req.params.id;
  const { spentAt, title, amount, category, note } = req.body;

  if (!id) {
    res.status(400).send('Bad Request');

    return;
  }

  const existingExpense = expensesService.getById(id);

  if (!existingExpense) {
    res.status(404).send('Not Found');

    return;
  }

  if (!spentAt && !title && !amount && !category && !note) {
    res.status(400).send('Bad Request');
  }

  const expense = expensesService.update({
    id,
    spentAt,
    title,
    amount,
    category,
    note,
  });

  if (expense === null) {
    res.status(404).end();

    return;
  }

  res.status(200).json(expense);
};

module.exports = {
  getAll,
  getById,
  create,
  deleteById,
  update,
};
