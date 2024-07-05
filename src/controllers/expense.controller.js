const {
  getAll,
  getById,
  create,
  remove,
  update,
} = require('../services/expense.service');

const get = (req, res) => {
  res.send(getAll());
};

const getByIdController = (req, res) => {
  const { id } = req.params;
  const expense = getById(id);

  if (!expense) {
    res.status(404).send({ message: 'Expense not found' });
    return;
  }
  res.send(expense);
};

const createController = (req, res) => {
  const { title, amount } = req.body;

  if (!title || amount === undefined) {
    res.status(400).send({ message: 'Title and amount are required' });
    return;
  }

  const expense = create(title, amount);
  res.status(201).send(expense);
};

const removeController = (req, res) => {
  const { id } = req.params;
  const success = remove(id);

  if (!success) {
    res.status(404).send({ message: 'Expense not found' });
    return;
  }
  res.sendStatus(204);
};

const updateController = (req, res) => {
  const { id } = req.params;
  const updates = req.body;

  const expense = update(id, updates);

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
