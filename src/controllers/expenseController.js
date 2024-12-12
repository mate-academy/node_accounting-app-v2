const {
  getExpenses,
  getExpenseById,
  create,
  remove,
  update,
} = require('../services/expensesService');
const userService = require('../services/userService');

const getAll = (req, res) => {
  const { userId, categories, from, to } = req.query;

  res.statusCode = 200;
  res.send(getExpenses(userId, categories, from, to));
};

const getExpense = (req, res) => {
  const { id } = req.params;

  const expense = getExpenseById(+id);

  if (!expense) {
    return res.sendStatus(404);
  }

  res.statusCode = 200;
  res.send(expense);
};

const createExpense = (req, res) => {
  const requiredFields = [
    'userId',
    'spentAt',
    'title',
    'amount',
    'category',
    'note',
  ];
  const requestData = req.body;

  const missingField = requiredFields.find((field) => !(field in requestData));

  if (missingField) {
    return res.sendStatus(400);
  }

  const user = userService.getUserById(requestData.userId);

  if (!user) {
    res.sendStatus(400);

    return;
  }

  res.statusCode = 201;
  res.send(create(requestData));
};

const removeExpense = (req, res) => {
  const { id } = req.params;
  const expense = getExpenseById(+id);

  if (!expense) {
    return res.sendStatus(404);
  }

  res.statusCode = 204;
  res.send(remove(expense.id));
};

const updateExpense = (req, res) => {
  const { id } = req.params;
  const body = req.body;
  const expense = getExpenseById(+id);

  if (!expense) {
    return res.sendStatus(404);
  }

  res.statusCode = 200;
  res.send(update(expense.id, body));
};

module.exports = {
  getAll,
  getExpense,
  createExpense,
  removeExpense,
  updateExpense,
};
