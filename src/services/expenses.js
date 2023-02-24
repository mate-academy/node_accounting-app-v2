'use strict';

let expenses = [];

const expensesService = {
  setInitial: () => {
    expenses = [];
  },
  getAll: (searchParams) => {
    const { userId, category, from, to } = searchParams;

    return expenses.filter(expense => {
      const isUserIdMatch = userId
        ? expense.userId === +userId
        : true;

      const isCategoriesMatch = category
        ? expense.category === category
        : true;

      const isFromMatch = from
        ? expense.spentAt >= from
        : true;

      const isToMatch = to
        ? expense.spentAt <= to
        : true;

      return isUserIdMatch && isCategoriesMatch && isFromMatch && isToMatch;
    });
  },
  getById: (expenseId) => {
    const foundExpense = expenses
      .find(expense => expense.id === Number(expenseId));

    return foundExpense || null;
  },
  create: (expenseData) => {
    const newId = Math.max(...expenses.map(expense => expense.id), 0) + 1;

    const newExpense = {
      id: newId,
      ...expenseData,
    };

    expenses.push(newExpense);

    return newExpense;
  },
  remove: (expenseId) => {
    expenses = expenses.filter(expense => expense.id !== Number(expenseId));
  },
  update: (expenseId, dataToUpdate) => {
    const foundExpense = expenses
      .find(expense => expense.id === Number(expenseId));

    const updatedExpense = Object.assign(foundExpense, dataToUpdate);

    return updatedExpense;
  },
};

module.exports = {
  expensesService,
};
