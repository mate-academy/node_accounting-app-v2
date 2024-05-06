const expensesService = require('../services/expenses.service.js');
const usersService = require('../services/user.service.js');

const getAll = (req, res) => {
  const expenses = expensesService.getAll();

  res.send(expenses);
};

const getOne = (req, res) => {
  const expensesId = req.params.id;

  const expenses = expensesService.getOne(expensesId);

  if (!expenses) {
    res.status(404).send('Bad request');

    return;
  }

  res.send(expenses);
};

const create = (req, res) => {
  const { userId, spentAt, title, amount, category, note } = req.body;

  if (!userId || !spentAt || !title || !amount || !category || !note) {
    res.status(400).send('Bad request');

    return;
  }

  const user = usersService.getById(userId);

  if (!user) {
    res.status(400).send('Bad Request');

    return;
  }

  const newExpenses = expensesService.create({ ...req.body });

  res.status(201).send(newExpenses);
};

const update = (req, res) => {
  const expensesId = req.params.id;
  const { userId, spentAt, title, amount, category, note } = req.body;

  const expenses = expensesService.getOne(expensesId);

  if (!expenses) {
    res.status(404).send('Not Found');

    return;
  }

  if (!userId || !spentAt || !title || !amount || !category || !note) {
    res.status(400).send('Bad request');

    return;
  }

  const updatedExpenses = expensesService.update({
    id: expenses.id,
    ...req.body,
  });

  res.send(updatedExpenses);
};

const remove = (req, res) => {
  const expensesId = req.params.id;

  const expenses = expensesService.getOne(expensesId);

  if (!expenses) {
    res.status(404).send('Not Found');

    return;
  }

  expensesService.remove(expenses.id);

  res.status(204).send('Expenses removed');
};

module.exports = {
  getAll,
  getOne,
  create,
  update,
  remove,
};
