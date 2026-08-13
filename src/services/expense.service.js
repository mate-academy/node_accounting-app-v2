'use strict';

function createExpenseService() {
  const expenses = [];
  let nextExpenseId = 1;

  const getAllExpenses = (userId, categories, from, to) => {
    let result = [...expenses];

    if (userId) {
      result = result.filter((expense) => expense.userId === Number(userId));
    }

    if (categories) {
      result = result.filter((expense) => expense.category === categories);
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

  const getExpenseById = (expenseId) => {
    return expenses.find((expense) => expense.id === Number(expenseId)) || null;
  };

  const createExpense = (expenseData) => {
    const expense = {
      id: nextExpenseId++,
      ...expenseData,
    };

    expenses.push(expense);

    return expense;
  };

  const removeExpense = (expenseId) => {
    const index = expenses.findIndex(
      (expense) => expense.id === Number(expenseId),
    );

    if (index === -1) {
      return false;
    }

    expenses.splice(index, 1);

    return true;
  };

  const updateExpense = (expenseId, updates) => {
    const expense = getExpenseById(expenseId);

    if (!expense) {
      return null;
    }

    Object.assign(expense, updates);

    return expense;
  };

  return {
    getAllExpenses,
    getExpenseById,
    createExpense,
    removeExpense,
    updateExpense,
  };
}

module.exports = createExpenseService;
