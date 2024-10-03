/* eslint-disable no-console */
const { data } = require('./data');

function getAllExpenses(queries) {
  if (!queries) {
    return data.expenses;
  }

  let copyExspenses = [...data.expenses];

  if (queries.userId) {
    copyExspenses = copyExspenses.filter((ex) => ex.userId === +queries.userId);
  }

  if (queries.categories) {
    copyExspenses = copyExspenses.filter((ex) => {
      return queries.categories.includes(ex.category);
    });
  }

  if (queries.from) {
    copyExspenses = copyExspenses.filter((ex) => ex.spentAt > queries.from);
  }

  if (queries.to) {
    copyExspenses = copyExspenses.filter((ex) => ex.spentAt < queries.to);
  }

  return copyExspenses;
}

function addExpense(userId, spentAt, title, amount, category, note) {
  const newExpense = {
    id: Math.random(),
    userId: userId,
    spentAt: spentAt,
    title: title,
    amount: amount,
    category: category,
    note: note,
  };

  const isUser = data.users.find((user) => user.id === userId);

  if (!isUser) {
    return null;
  }

  data.expenses.push(newExpense);

  return newExpense;
}

function getExpenseById(expenseId) {
  const neededExpense = data.expenses.find((ex) => ex.id === +expenseId);

  if (!neededExpense) {
    return null;
  }

  return neededExpense;
}

function deleteExpense(expenseId) {
  const neededIndex = data.expenses.findIndex((ex) => ex.id === +expenseId);

  if (neededIndex === -1) {
    return null;
  }

  const [deletedExpense] = data.expenses.splice(neededIndex, 1);

  return deletedExpense;
}

function updateExpense(expenseId, updating) {
  const expenseToUpdate = data.expenses.find((ex) => ex.id === +expenseId);

  if (!expenseToUpdate) {
    return null;
  }

  return Object.assign(expenseToUpdate, updating);
}

function validateNewExpense(req, res, next) {
  const { userId, spentAt, title, amount, category, note } = req.body;

  if (!userId || !spentAt || !title || !amount || !category || !note) {
    return res.sendStatus(400);
  }

  next();
}

module.exports = {
  getAllExpenses,
  addExpense,
  getExpenseById,
  deleteExpense,
  updateExpense,
  validateNewExpense,
};
