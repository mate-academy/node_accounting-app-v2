'use strict';

function createExpensesService({ usersService }) {
  const expenses = [];
  let lastId = 0;

  function createId() {
    const now = Date.now();

    lastId = now > lastId ? now : lastId + 1;

    return lastId;
  }

  function createExpense(expenseData) {
    const expense = {
      id: createId(),
      ...expenseData,
    };

    expenses.push(expense);

    return expense;
  }

  function getExpenses(filters = {}) {
    const { userId, from, to, categories } = filters;

    return expenses.filter((expense) => {
      if (userId !== undefined && expense.userId !== userId) {
        return false;
      }

      if (from !== undefined && new Date(expense.spentAt) < new Date(from)) {
        return false;
      }

      if (to !== undefined && new Date(expense.spentAt) > new Date(to)) {
        return false;
      }

      if (categories && !categories.includes(expense.category)) {
        return false;
      }

      return true;
    });
  }

  function getExpenseById(id) {
    return expenses.find((expense) => expense.id === id) || null;
  }

  function updateExpense(id, changes) {
    const expense = getExpenseById(id);

    if (!expense) {
      return null;
    }

    Object.entries(changes).forEach(([key, value]) => {
      if (value !== undefined) {
        expense[key] = value;
      }
    });

    return expense;
  }

  function deleteExpense(id) {
    const expenseIndex = expenses.findIndex((expense) => expense.id === id);

    if (expenseIndex === -1) {
      return false;
    }

    expenses.splice(expenseIndex, 1);

    return true;
  }

  function hasUser(userId) {
    return usersService.getUserById(userId) !== null;
  }

  return {
    createExpense,
    getExpenses,
    getExpenseById,
    updateExpense,
    deleteExpense,
    hasUser,
  };
}

module.exports = {
  createExpensesService,
};
