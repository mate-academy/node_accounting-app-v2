const Expense = require('../models/expense.model');
const User = require('../models/user.model');

const getExpenses = (req, res) => {
  res.send(Expense.getExpenses(req.query));
};

const addExpense = (req, res) => {
  const { userId, spentAt, title, amount, category, note } = req.body;

  const properties = {
    userId,
    spentAt,
    title,
    amount,
    category,
    note,
  };

  const user = User.getUser(userId);

  let propsAreValid = true;

  for (const key in properties) {
    // can't add just !properties[key], because prop could be 0
    if (
      properties[key] === undefined ||
      properties[key] === null ||
      properties[key] === ''
    ) {
      propsAreValid = false;
      break;
    }
  }

  if (!propsAreValid || !user) {
    return res.sendStatus(400);
  }

  res.status(201).send(Expense.addExpense(req.body));
};

const getExpense = (req, res) => {
  const { id } = req.params;

  if (isNaN(Number(id))) {
    return res.sendStatus(400);
  }

  const expense = Expense.getExpense(id);

  if (!expense) {
    return res.sendStatus(404);
  }

  res.send(expense);
};

const deleteExpense = (req, res) => {
  const { id } = req.params;
  const expense = Expense.getExpense(id);

  if (!expense) {
    return res.sendStatus(404);
  }

  Expense.deleteExpense(id);
  res.sendStatus(204);
};

const updateExpense = (req, res) => {
  const { id } = req.params;

  if (isNaN(Number(id))) {
    return res.sendStatus(400);
  }

  const expense = Expense.getExpense(id);

  if (!expense) {
    return res.sendStatus(404);
  }

  res.send(Expense.updateExpense(id, req.body));
};

module.exports = {
  getExpenses,
  addExpense,
  getExpense,
  deleteExpense,
  updateExpense,
};
