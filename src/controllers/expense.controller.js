const expensesService = require('../services/expenses.service');
const usersService = require('../services/users.service');

const get = (req, res) => {
  const expenses = expensesService.getAll(req.query);

  res.status(200).send(expenses);
};

const getById = (req, res) => {
  const { id } = req.params;
  const expense = expensesService.getById(id);

  if (!expense) {
    return res.status(404).json({ message: 'This id was not found' });
  }

  res.status(200).send(expense);
};

const create = (req, res) => {
  const { userId, spentAt, title, amount, category, note } = req.body;
  const user = usersService.getById(String(userId));

  if (!user || !spentAt || !title || !amount || !category) {
    return res.status(400).json({ message: 'Missing required fields' });
  }

  if (isNaN(Date.parse(spentAt))) {
    return res.status(400).json({ message: 'Invalid date format' });
  }

  if (typeof title !== 'string' || title.trim() === '') {
    return res
      .status(400)
      .json({ message: 'Title must be a non-empty string' });
  }

  if (typeof category !== 'string' || category.trim() === '') {
    return res
      .status(400)
      .json({ message: 'Category must be a non-empty string' });
  }

  if (typeof amount !== 'number' || amount <= 0) {
    return res
      .status(400)
      .json({ message: 'Amount must be a positive number' });
  }

  try {
    const newExpense = expensesService.create({
      userId,
      spentAt,
      title,
      amount,
      category,
      note,
    });

    res.status(201).send(newExpense);
  } catch {
    res.status(500).json({
      message:
        'The server failed to complete the request due to an unexpected error.',
    });
  }
};

const remove = (req, res) => {
  const { id } = req.params;
  const expense = expensesService.getById(id);

  if (!expense) {
    return res.sendStatus(404);
  }

  expensesService.remove(id);
  res.sendStatus(204);
};

const update = (req, res) => {
  const { id } = req.params;
  const data = req.body;

  const expense = expensesService.getById(id);

  if (!expense) {
    return res.sendStatus(404);
  }

  const updatedExpense = expensesService.update(id, data);

  res.status(200).send(updatedExpense);
};

module.exports = {
  get,
  getById,
  create,
  remove,
  update,
};
