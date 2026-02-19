const expensesServices = require('../services/expenses.services');
const userServices = require('../services/user.services');

const getAll = (req, res) => {
  const { userId, categories, from, to } = req.query;

  res.send(
    expensesServices.getAll({
      userId,
      categories,
      from,
      to,
    }),
  );
};

const getById = (req, res) => {
  const { id } = req.params;
  const expense = expensesServices.getById(id);

  if (!expense) {
    res.sendStatus(404);

    return;
  }

  res.send(expense);
};

const create = (req, res) => {
  const data = req.body;

  if (!data || typeof data !== 'object') {
    return res.sendStatus(400);
  }

  const isValidData = expensesServices.validateExpenseData(data);

  if (!isValidData) {
    return res.sendStatus(400);
  }

  const user = userServices.getById(data.userId);

  if (!user) {
    return res.sendStatus(400);
  }

  const newExpense = expensesServices.create(data);

  res.status(201).send(newExpense);
};

const remove = (req, res) => {
  const { id } = req.params;
  const expense = expensesServices.getById(id);

  if (!expense) {
    res.sendStatus(404);

    return;
  }

  expensesServices.remove(id);

  res.sendStatus(204);
};

const update = (req, res) => {
  const { id } = req.params;
  const fieldsToUpdate = req.body;
  const expense = expensesServices.getById(id);

  if (!expense) {
    res.sendStatus(404);

    return;
  }

  if (!Object.values(fieldsToUpdate).length) {
    res.sendStatus(400);

    return;
  }

  const updatedExpense = expensesServices.update(id, fieldsToUpdate);

  res.status(200).send(updatedExpense);
};

module.exports = {
  getAll,
  getById,
  create,
  remove,
  update,
};
