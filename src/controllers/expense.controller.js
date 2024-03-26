const expenseServise = require('../services/expense.servise.js');

const getAll = (req, res) => {
  res.send(expenseServise.getAll());
};

const getOne = (req, res) => {
  const { id } = req.params;

  const expense = expenseServise.getOne(id);

  if (!expense) {
    res.sendStatus(404);

    return;
  }

  res.send(expense);
};

const create = (req, res) => {
  const expense = req.body;
  const newExpense = expenseServise.create(expense);

  if (!newExpense) {
    res.sendStatus(422);

    return;
  }
  res.send(newExpense);
};

const remove = (req, res) => {
  const { id } = req.params;
  const wasDeleted = expenseServise.remove(id);

  if (!wasDeleted) {
    res.sendStatus(404);

    return;
  }
  res.sendStatus(204);
};

const update = (req, res) => {
  const { id } = req.params;
  const expense = expenseServise.update(id, req.body);

  if (expense === 'Wrong body') {
    res.sendStatus(422);

    return;
  }

  if (expense === 'Not found') {
    res.sendStatus(404);

    return;
  }

  res.send(expense);
};

module.exports = {
  getAll,
  getOne,
  create,
  remove,
  update,
};
