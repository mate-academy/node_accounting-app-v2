'use strict';

const expenses = [];

const getMaxId = () => {
  return expenses.length
    ? Math.max(...expenses.map(expense => expense.id))
    : 0;
};

const initExpenses = () => {
  expenses.length = 0;
};

const getExpenseById = id => expenses.find(expense => expense.id === +id);

const getFilteredExpenses = (userId, categories, from, to) => {
  let filteredExpenses = [...expenses];

  if (userId) {
    filteredExpenses = filteredExpenses
      .filter(expense => expense.userId === +userId);
  }

  if (categories) {
    filteredExpenses = filteredExpenses
      .filter(({ category }) => categories.includes(category));
  }

  if (from && to) {
    filteredExpenses = filteredExpenses
      .filter(expense => {
        const { spentAt } = expense;
        const expenseTime = new Date(spentAt).getTime();
        const fromTime = new Date(from).getTime();
        const toTime = new Date(to).getTime();

        if (expenseTime >= fromTime && expenseTime <= toTime) {
          return expense;
        }
      });
  }

  return filteredExpenses;
};

const updateExpense = (expenseId, data) => {
  const expenseToUpdate = getExpenseById(expenseId);

  Object.assign(expenseToUpdate, data);

  return expenseToUpdate;
};

const addNewExpense = data => {
  const newExpense = {
    ...data,
    id: getMaxId() + 1,
  };

  expenses.push(newExpense);

  return newExpense;
};

const deleteExpense = expenseId => {
  const index = expenses.findIndex(expense => expense.id === +expenseId);

  expenses.splice(index, 1);
};

module.exports = {
  initExpenses,
  getExpenseById,
  getFilteredExpenses,
  updateExpense,
  addNewExpense,
  deleteExpense,
};
