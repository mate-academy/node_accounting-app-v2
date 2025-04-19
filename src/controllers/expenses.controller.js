const {
  add,
  get,
  getAll,
  remove,
  update,
} = require('../services/expenses.service.js');

const getExpenses = (req, res) => {
  const queries = req.query;

  const allExpenses = getAll(queries);

  return res.status(200).send(allExpenses);
};

const createExpense = (req, res) => {
  const body = req.body;
  const newExpense = add(body);

  if (!newExpense) {
    return res.status(400).send('Bad request');
  }

  return res.status(201).send(newExpense);
};

const getExpense = (req, res) => {
  const { id } = req.params;

  if (!id || isNaN(+id)) {
    return res.status(400).send('Bad request');
  }

  const expense = get(+id);

  if (!expense) {
    return res.status(404).send('Not found');
  }

  return res.status(200).send(expense);
};

const removeExpense = (req, res) => {
  const { id } = req.params;

  if (!id || isNaN(+id)) {
    return res.status(400).send('Bad request');
  }

  const removeOne = remove(+id);

  if (!removeOne) {
    return res.status(404).send('Not found');
  }

  return res.sendStatus('204');
};

const updateExpense = (req, res) => {
  const { id } = req.params;
  const expense = req.body;

  if (!id || isNaN(+id)) {
    return res.status(400).send('Bad request');
  }

  if (Object.keys(expense).length === 0) {
    return res.status(404).send('Not found');
  }

  const updatedUser = update(id, expense);

  if (!updatedUser) {
    return res.status(404).send('Not found');
  }

  return res.status(200).send(updatedUser);
};

module.exports = {
  getExpenses,
  createExpense,
  getExpense,
  updateExpense,
  removeExpense,
};
