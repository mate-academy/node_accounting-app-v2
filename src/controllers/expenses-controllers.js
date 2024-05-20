const {
  getExpensesData,
  getOneExpenseData,
  addExpense,
  removeExpense,
  updatedExpenseData,
} = require('../services/expenses-service');

const { getOneUserData } = require('../services/users-service');
const { STATUS_CODES } = require('../utils/constants');

function isSomeDataInvalid({ userId, spentAt, title, amount, category, note }) {
  return userId || spentAt || title || amount || category || note;
}

const getExpenses = (req, res) => {
  const filteredExpenses = getExpensesData(req.query);

  res.send(filteredExpenses);
};

const getExpenseById = (req, res) => {
  const { id } = req.params;
  const expense = getOneExpenseData(id);

  if (!expense) {
    res.statusCode = STATUS_CODES.NOT_FOUND;
    res.send(res.statusCode);

    return;
  }

  res.statusCode = STATUS_CODES.OK;
  res.send(expense);
};

const postExpense = (req, res) => {
  const { userId, spentAt, title, amount, category, note } = req.body;

  if (!isSomeDataInvalid || !getOneUserData(userId)) {
    res.statusCode = STATUS_CODES.BAD_REQUEST;
    res.send(res.statusCode);

    return;
  }

  const expense = addExpense({
    userId,
    spentAt,
    title,
    amount,
    category,
    note,
  });

  res.statusCode = STATUS_CODES.CREATED;
  res.send(expense);
};

const deleteExpense = (req, res) => {
  const { id } = req.params;
  const previousExpenses = getExpensesData();

  const newExpenses = removeExpense(id);

  if (previousExpenses.length === newExpenses.length) {
    res.statusCode = STATUS_CODES.NOT_FOUND;
    res.send(res.statusCode);
  } else {
    res.statusCode = STATUS_CODES.NO_CONTENT;
    res.send(res.statusCode);
  }
};

const updateExpense = (req, res) => {
  const { id } = req.params;
  const { spentAt, title, amount, category, note } = req.body;
  const expense = getOneExpenseData(id);

  if (!expense) {
    res.statusCode = STATUS_CODES.NOT_FOUND;
    res.send('Expense not found');
  } else {
    const newExpense = updatedExpenseData(id, {
      spentAt,
      title,
      amount,
      category,
      note,
    });

    res.statusCode = STATUS_CODES.OK;
    res.send(newExpense);
  }
};

module.exports = {
  getExpenses,
  getExpenseById,
  postExpense,
  deleteExpense,
  updateExpense,
};
