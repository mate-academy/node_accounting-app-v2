const expensesService = require('../services/expenses.service.js');
const usersService = require('../services/users.service.js');

const get = (req, res) => {
  const { from, to, userId, categories } = req.query;
  const filteredExpenses = expensesService.filterByQuery(
    categories,
    from,
    to,
    userId,
  );

  return res.status(200).json(filteredExpenses);
};

const getOne = (req, res) => {
  const { id } = req.params;

  const expensesId = expensesService.getById(id);

  if (!expensesId) {
    return res.status(404).json({ message: 'Expenses not found' });
  }

  return res.status(200).json(expensesId);
};

const create = (req, res) => {
  const data = req.body;
  const userExists = usersService.exist(data.userId);

  if (Object.keys(req.body).length === 0) {
    return res.status(400).json({ message: 'Invalid data provided' });
  }

  if (!userExists) {
    return res.status(400).json({ message: 'User not found' });
  }

  const newPost = expensesService.create(data);

  return res.status(201).json(newPost);
};

const update = (req, res) => {
  const { id } = req.params;
  const data = req.body;

  const index = expensesService.indexOfExpense(id);

  if (index === -1) {
    return res.status(404).json({ message: 'Expense not found!' });
  }

  const newExpense = expensesService.update(index, data);

  return res.status(200).json(newExpense);
};

const remove = (req, res) => {
  const { id } = req.params;

  const index = expensesService.indexOfExpense(id);

  if (index === -1) {
    return res.status(404).json({ message: 'Not Found' });
  }
  expensesService.remove(index);

  return res.status(204).end();
};

module.exports = {
  get,
  getOne,
  create,
  remove,
  update,
};
