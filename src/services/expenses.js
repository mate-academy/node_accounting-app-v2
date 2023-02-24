'use strict';

const createExpenseId = () => {
  return Math.max(...expenses.map(expense => +expense.id), 0) + 1;
};

let expenses = [];

const resetExpenses = () => {
  expenses = [];
};

const getExpenses = (params) => {
  const { userId, category, from, to } = params;

  if (!expenses.length) {
    return [];
  }

  return expenses.filter(expense => {
    const isUserId = userId
      ? expense.userId === +userId
      : true;

    const isCategory = category
      ? expense.category === category
      : true;

    const isFrom = from
      ? expense.spentAt >= from
      : true;

    const isTo = to
      ? expense.spentAt <= to
      : true;

    const isEveryTrue = isUserId && isCategory && isFrom && isTo;

    if (isEveryTrue) {
      return true;
    }

    return false;
  });
};

const createExpense = (expense) => {
  const newExpense = {
    ...expense,
    id: createExpenseId(),
  };

  expenses.push(newExpense);

  return newExpense;
};

const findExpenseById = (expenseId) => {
  return expenses.find(expense => expense.id === +expenseId) || null;
};

const deleteExpense = (expenseId) => {
  expenses = expenses.filter(expense => expense.id !== +expenseId);
};

const updateExpense = (id, params) => {
  const expense = findExpenseById(id);

  Object.assign(expense, params);

  return expense;
};

module.exports = {
  getExpenses,
  createExpense,
  findExpenseById,
  deleteExpense,
  updateExpense,
  resetExpenses,
};
