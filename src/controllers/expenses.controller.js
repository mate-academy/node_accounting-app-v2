const expensesServices = require('../services/expenses.service');
const usersServices = require('../services/users.service');

const get = (req, res) => {
  const query = req.query;

  res.status(200).json(expensesServices.getAll(query));
};

const create = (req, res) => {
  const { userId, spentAt, title, amount, category, note = '' } = req.body;

  if (
    typeof userId !== 'number' ||
    typeof spentAt !== 'string' ||
    typeof title !== 'string' ||
    typeof amount !== 'number' ||
    typeof category !== 'string' ||
    typeof note !== 'string'
  ) {
    res.sendStatus(400);

    return;
  }

  const user = usersServices.getById(+userId);

  if (!user) {
    res.sendStatus(400);

    return;
  }

  const newExpense = expensesServices.create({
    userId,
    spentAt,
    title,
    amount,
    category,
    note,
  });

  res.status(201).json(newExpense);
};

const getOne = (req, res) => {
  const { id } = req.params;

  const expenses = expensesServices.getById(+id);

  if (!expensesServices.getById(+id)) {
    res.sendStatus(404);

    return;
  }

  res.status(200).json(expenses);
};

const remove = (req, res) => {
  const { id } = req.params;

  if (!expensesServices.getById(+id)) {
    res.sendStatus(404);

    return;
  }

  expensesServices.remove(+id);

  res.sendStatus(204);
};

const update = (req, res) => {
  const { id } = req.params;
  const body = req.body;

  if (!Object.keys(body)) {
    res.sendStatus(400);

    return;
  }

  const expense = expensesServices.getById(+id);

  if (!expense) {
    res.sendStatus(404);

    return;
  }

  const updatedExpense = expensesServices.update(+id, body);

  res.status(200).json(updatedExpense);
};

module.exports = {
  get,
  create,
  getOne,
  remove,
  update,
};
