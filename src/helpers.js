'use strict';

function getNewId(items) {
  if (!items[0]) {
    return 1;
  }

  const ids = items.map(item => item.id);
  const newId = Math.max(...ids) + 1;

  return newId;
}

const findById = (items, itemId) => {
  const foundItem = items.find(item => item.id === itemId);

  return foundItem || null;
};

function filterExpenses(expenses, {
  userId,
  categories,
  from,
  to,
}) {
  let filteredExpenses = expenses;

  if (userId) {
    filteredExpenses = filteredExpenses.filter(expense => (
      expense.userId === Number(userId)
    ));
  }

  if (categories) {
    filteredExpenses = filteredExpenses.filter(expense => (
      categories.includes(expense.category))
    );
  }

  if (from) {
    const fromDate = new Date(from);

    filteredExpenses = filteredExpenses.filter(expense => (
      expense.spentAt >= fromDate
    ));
  }

  if (to) {
    const toDate = new Date(to);

    filteredExpenses = filteredExpenses.filter(expense => (
      expense.spentAt <= toDate
    ));
  }

  return filteredExpenses;
}

module.exports = {
  findById,
  getNewId,
  filterExpenses,
};
