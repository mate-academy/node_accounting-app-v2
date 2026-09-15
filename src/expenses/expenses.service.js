const userService = require('../users/users.service.js');

let expenses = [];
let lastId = 0;

function resetExpenses() {
  expenses = [];
  lastId = 0;
}

function getAll(filters) {
  let result = expenses;

  if (filters.userId) {
    result = result.filter(
      (expense) => expense.userId === Number(filters.userId),
    );
  }

  if (filters.categories) {
    result = result.filter(
      (expense) => expense.category === filters.categories,
    );
  }

  if (filters.from && filters.to) {
    result = result.filter((expense) => {
      const expenseDate = new Date(expense.spentAt);
      const fromDate = new Date(filters.from);
      const toDate = new Date(filters.to);

      return expenseDate >= fromDate && expenseDate <= toDate;
    });
  }

  return result;
}

function getById(id) {
  return expenses.find((expense) => expense.id === id);
}

function create({ userId, amount, spentAt, title, category, note }) {
  if (!userService.getById(userId)) {
    return null;
  }
  lastId += 1;

  const newExpense = {
    id: lastId,
    userId,
    amount,
    spentAt,
    title,
    category,
    note,
  };

  expenses.push(newExpense);

  return newExpense;
}

function update(id, changes) {
  const expenseIndex = expenses.findIndex((expense) => expense.id === id);

  if (expenseIndex === -1) {
    return null;
  }

  expenses[expenseIndex] = { ...expenses[expenseIndex], ...changes };

  return expenses[expenseIndex];
}

function remove(id) {
  const expenseIndex = expenses.findIndex((expense) => expense.id === id);

  if (expenseIndex === -1) {
    return false;
  }

  expenses.splice(expenseIndex, 1);

  return true;
}

module.exports = {
  resetExpenses,
  getAll,
  getById,
  create,
  update,
  remove,
};
