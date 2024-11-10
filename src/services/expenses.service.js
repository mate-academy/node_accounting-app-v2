const { generateId } = require('../utils/generateId');

const expenses = [];

function clearExpenses() {
  expenses.length = 0;
}

function getAll(query) {
  const { userId, categories, from, to } = query;

  return expenses.filter((expense) => {
    if (userId && expense.userId !== +userId) {
      return false;
    }

    if (
      categories &&
      Array.isArray(categories) &&
      !categories.includes(expense.category)
    ) {
      return false;
    }

    if (
      categories &&
      !Array.isArray(categories) &&
      categories !== expense.category
    ) {
      return false;
    }

    if (from && from > expense.spentAt) {
      return false;
    }

    if (to && to < expense.spentAt) {
      return false;
    }

    return true;
  });
}

function getById(id) {
  return expenses.find((expense) => expense.id === id);
}

function create(params) {
  const expense = {
    id: generateId(),
    ...params,
  };

  expenses.push(expense);

  return expense;
}

function deleteById(id) {
  const index = expenses.findIndex((expense) => expense.id === id);

  if (index === -1) {
    return;
  }

  const [deletedExpense] = expenses.splice(index, 1);

  return deletedExpense;
}

function update(id, params) {
  const expensetoUpdate = expenses.find((expense) => expense.id === id);

  if (!expensetoUpdate) {
    return;
  }

  return Object.assign(expensetoUpdate, params);
}

module.exports = {
  getAll,
  getById,
  create,
  deleteById,
  update,
  clearExpenses,
};
