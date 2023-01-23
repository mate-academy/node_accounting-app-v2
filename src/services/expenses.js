'use strict';

let expenses = [];

const init = () => {
  expenses = [];
};

const getAllExpenses = (userId, category, from, to) => {
  if (category) {
    const filteredExpenses = expenses
      .filter(expense => expense.category === category);

    return filteredExpenses;
  }

  if (from && to) {
    const filteredExpenses = expenses
      .filter(expense =>
        expense.spentAt >= from && expense.spentAt <= to,
      );

    return filteredExpenses;
  }

  if (userId) {
    const filteredExpenses = expenses
      .filter(expense => expense.userId === Number(userId));

    return filteredExpenses;
  }

  return expenses;
};

const getExpenseById = (expenseId) => {
  const foundExpense = expenses.find(expense => expense.id === expenseId);

  return foundExpense || null;
};

const addNewExpense = (
  userId,
  spentAt,
  title,
  amount,
  category,
  note,
) => {
  const id = Math.max(0, ...expenses.map(expense => expense.id)) + 1;
  const newExpense = {
    id,
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

const deleteExpenseById = (expenseId) => {
  expenses = expenses.filter(expense => expense.id !== expenseId);
};

const updateExpenseById = (
  expenseId,
  dataToUpdate,
) => {
  const foundExpense = getExpenseById(expenseId);

  Object.assign(foundExpense, dataToUpdate);

  return foundExpense;
};

module.exports = {
  init,
  getAllExpenses,
  getExpenseById,
  addNewExpense,
  deleteExpenseById,
  updateExpenseById,
};
