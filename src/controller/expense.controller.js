const expenseServise = require('../services/expenseService');
const usersService = require('../services/userService');
const statusCodes = require('../types/statusCode');

const getAll = (req, res) => {
  const filteredExpenses = expenseServise.getAll(req.query);

  res.json(filteredExpenses);
};

const getById = (req, res) => {
  const { id } = req.params;

  const expense = expenseServise.getById(id);

  if (!expense) {
    res.sendStatus(statusCodes.NOT_FOUND);

    return;
  }

  res.json(expense);
};

const create = (req, res) => {
  const body = req.body;
  const userChecking = usersService.getById(body.userId);

  if (!userChecking) {
    res.sendStatus(statusCodes.BAD_REQUEST);

    return;
  }

  const expense = expenseServise.create(body);

  res.status(statusCodes.CREATED).json(expense);
};

const update = (req, res) => {
  const { id } = req.params;

  const expense = expenseServise.getById(id);

  if (!expense) {
    res.sendStatus(statusCodes.NOT_FOUND);
  }

  const updatedExpense = expenseServise.update(id, req.body);

  res.json(updatedExpense);
};

const remove = (req, res) => {
  const { id } = req.params;

  if (!expenseServise.getById(id)) {
    res.sendStatus(statusCodes.NOT_FOUND);

    return;
  }

  expenseServise.remove(id);

  res.sendStatus(statusCodes.NO_CONTENT);
};

module.exports = {
  getAll,
  getById,
  create,
  update,
  remove,
};
