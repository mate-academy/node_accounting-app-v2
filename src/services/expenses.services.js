const { expenses } = require('../db/expenses');
const { users } = require('../db/users');

const getFilteredExpenses = (userId, categories, from, to) => {
  let result = expenses;

  if (userId) {
    result = result.filter((expense) => expense.userId === Number(userId));
  }

  if (categories) {
    result = result.filter((expense) =>
      // eslint-disable-next-line
      categories.includes(expense.category),);
  }

  if (from) {
    result = result.filter(
      (expense) => new Date(expense.spentAt) >= new Date(from),
    );
  }

  if (to) {
    result = result.filter(
      (expense) => new Date(expense.spentAt) <= new Date(to),
    );
  }

  return result;
};

const create = (userId, spentAt, title, amount, category, note) => {
  const user = users.find((us) => us.id === userId);

  if (!user) {
    return null;
  }

  const newExpense = {
    id: Math.max(...expenses.map((e) => e.id), 0) + 1,
    userId,
    spentAt,
    title,
    amount,
    category,
    note,
  };

  expenses.push(newExpense);

  return newExpense;
};

const getById = (expensId) => {
  const searchedExpense = expenses.find((expense) => expense.id === expensId);

  if (!searchedExpense) {
    return null;
  }

  return searchedExpense;
};

const remove = (expenseId) => {
  const userexpense = expenses.findIndex((expense) => expense.id === expenseId);

  if (userexpense === -1) {
    return null;
  }

  return expenses.splice(userexpense, 1);
};

const update = (expenseId, updatedData) => {
  const expenseIndex = expenses.findIndex(
    (expense) => expense.id === expenseId,
  );

  if (expenseIndex === -1) {
    return null;
  }

  expenses[expenseIndex] = { ...expenses[expenseIndex], ...updatedData };

  return expenses[expenseIndex];
};

module.exports = {
  getFilteredExpenses,
  create,
  getById,
  remove,
  update,
};
