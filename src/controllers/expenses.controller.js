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

  const isValidData = expensesServices.validateExpenseData(data);
  const user = userServices.getById(data.userId);

  if (!user || !isValidData) {
    res.sendStatus(400);

    return;
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

  res.send(204);
};

const update = (req, res) => {
  const { id } = req.params;
  const fieldsToUpdate = req.body;
  const expense = expensesServices.getById(id);

  if (!expense) {
    res.sendStatus(404);

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
