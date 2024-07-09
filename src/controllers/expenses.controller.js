const {
  getAll,
  getById,
  create,
  remove,
  update,
} = require('./services/expenses.service');

const getAllExpenses = (req, res) => {
  res.send(getAll(req.query));
};

const getByIdExpense = (req, res) => {
  const { id } = req.params;

  const expenseById = getById(id);

  if (!expenseById) {
    res.sendStatus(404);

    return;
  }

  res.send(expenseById);
};

const createExpense = (req, res) => {
  const { userId } = req.body;

  if (!getById(userId)) {
    res.sendStatus(400);

    return;
  }

  res.statusCode = 201;

  res.send(create(req.body));
};

const removeExpense = (req, res) => {
  const { id } = req.params;

  if (!getById(id)) {
    res.sendStatus(404);

    return;
  }

  remove(id);

  res.sendStatus(204);
};

const updateExpense = (req, res) => {
  const { id } = req.params;

  const expenseById = getById(id);

  if (!expenseById) {
    res.sendStatus(404);

    return;
  }

  update(expenseById, req);

  res.send(expenseById);
};

module.exports = {
  getAllExpenses,
  getByIdExpense,
  createExpense,
  removeExpense,
  updateExpense,
};
