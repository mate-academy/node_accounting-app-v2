const expenses = require('../data/expenses');
const generateId = require('../utils/randomNum');

function getAllExpenses({ userId, categories, from, to }) {
  let result = expenses;

  if (userId) {
    result = result.filter((e) => e.userId === Number(userId));
  }

  if (categories) {
    const normalized = [].concat(categories);

    result = result.filter((e) => normalized.includes(e.category));
  }

  if (from) {
    result = result.filter((e) => new Date(e.spentAt) >= new Date(from));
  }

  if (to) {
    result = result.filter((e) => new Date(e.spentAt) <= new Date(to));
  }

  return result;
}

function createExpenses({ userId, spentAt, title, amount, category, note }) {
  const newExpense = {
    id: generateId(),
    userId,
    spentAt,
    title,
    amount,
    category,
    note,
  };

  expenses.push(newExpense);

  return newExpense;
}

function getExpensesById(id) {
  return expenses.find((e) => e.id === Number(id));
}

function removeExpenses(id) {
  const index = expenses.findIndex((e) => e.id === Number(id));

  if (index === -1) {
    return null;
  }

  expenses.splice(index, 1);

  return true;
}

function updateExpenses({ id, spentAt, title, amount, category, note }) {
  const expense = getExpensesById(Number(id));

  const updates = Object.fromEntries(
    Object.entries({
      spentAt,
      title,
      amount,
      category,
      note,
    }).filter(([, value]) => value !== undefined),
  );

  if (Object.keys(updates).length === 0) {
    return false;
  }

  Object.assign(expense, updates);

  return expense;
}

module.exports = {
  getAllExpenses,
  createExpenses,
  getExpensesById,
  removeExpenses,
  updateExpenses,
};
