const {
  getExpensesData,
  getOneExpenseData,
  getNewId,
  addExpense,
  getFilteredExpensesById,
  setNewExpenses,
  updatedExpenseData,
} = require('../services/expenses-service');

const { getOneUserData } = require('../services/users-service');

const getExpenses = (req, res) => {
  const filteredExpenses = getExpensesData(req.query);

  res.send(filteredExpenses);
};

const getExpenseById = (req, res) => {
  const { id } = req.params;
  const expense = getOneExpenseData(id);

  if (!expense) {
    res.statusCode = 404;
    res.send(res.statusCode);
  } else {
    res.statusCode = 200;
    res.send(expense);
  }
};

const postExpense = (req, res) => {
  const { userId, spentAt, title, amount, category, note } = req.body;

  if (!userId || !spentAt || !title || !amount || !category || !note) {
    res.statusCode = 400;
    res.send(res.statusCode);

    return;
  }

  if (!getOneUserData(userId)) {
    res.statusCode = 400;
    res.send(res.statusCode);

    return;
  }

  const expense = {
    id: getNewId(),
    userId,
    spentAt,
    title,
    amount,
    category,
    note,
  };

  addExpense(expense);
  res.statusCode = 201;
  res.send(expense);
};

const deleteExpense = (req, res) => {
  const { id } = req.params;

  const newExpenses = getFilteredExpensesById(id);

  if (getExpensesData().length === newExpenses.length) {
    res.statusCode = 404;
    res.send(res.statusCode);
  } else {
    setNewExpenses(newExpenses);
    res.statusCode = 204;
    res.send(res.statusCode);
  }
};

const updateExpense = (req, res) => {
  const { id } = req.params;
  const { spentAt, title, amount, category, note } = req.body;
  const expense = getOneExpenseData(id);

  if (!expense) {
    res.statusCode = 404;
    res.send('Expense not found');
  } else {
    const newExpense = updatedExpenseData(id, {
      spentAt,
      title,
      amount,
      category,
      note,
    });

    res.statusCode = 200;
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
