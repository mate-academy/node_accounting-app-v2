const expensesService = require('../services/expenses.services');

const getAll = (req, res) => {
  const expenses = expensesService.get(
    req.query.userId,
    req.query.categories,
    req.query.from,
    req.query.to,
  );

  res.status(200).json(expenses);
};

const getOne = (req, res) => {
  try {
    const { id } = req.params;
    const expense = expensesService.getById(id);

    res.status(200).json(expense);
  } catch (error) {
    res.sendStatus(404);
  }
};

const add = (req, res) => {
  const userId = parseInt(req.body.userId);

  const expenseData = req.body;

  try {
    const expense = expensesService.add(userId, expenseData);

    res.status(201).json(expense);
  } catch (error) {
    res.sendStatus(400);
  }
};

const remove = (req, res) => {
  const { id } = req.params;

  try {
    expensesService.remove(id);

    res.sendStatus(204);
  } catch (error) {
    res.sendStatus(404);
  }
};

const update = (req, res) => {
  const { id } = req.params;
  const expenseData = req.body;

  try {
    const expense = expensesService.update(id, expenseData);

    res.status(200).json(expense);
  } catch (error) {
    res.sendStatus(404);
  }
};

module.exports = {
  getAll,
  add,
  getOne,
  remove,
  update,
};
