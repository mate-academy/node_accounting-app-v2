'use strict';

let expenses = [];

const getAll = () => expenses;

const getExpenseById = (expenseId) => {
  const foundedExpense = expenses.find(exp => exp.id === +expenseId);

  return foundedExpense || null;
};

const getFilteredExpenses = (searchParams) => {
  const { userId, from, to, category } = searchParams;

  const filteredExpenses = expenses.filter(expense => {
    if (userId && expense.userId !== +userId) {
      return false;
    }

    if (category && expense.category !== category) {
      return false;
    }

    if (from && to) {
      const fromDate = new Date(from);
      const toDate = new Date(to);
      const spentAtDate = new Date(expense.spentAt);

      if (spentAtDate < fromDate || spentAtDate > toDate) {
        return false;
      }
    }

    return true;
  });

  return filteredExpenses;
};

const addExpense = (
  userId,
  spentAt,
  title,
  amount,
  category,
  note
) => {
  const maxId = Math.max(...expenses.map(exp => exp.id));
  const id = expenses.length ? maxId + 1 : 1;

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

const deleteExpense = (expenseId) => {
  expenses = expenses.filter(exp => exp.id !== +expenseId);
};

const updateExpense = (expenseId, expenseBody) => {
  const expenseToUpdate = getExpenseById(+expenseId);

  const updatedExpense = Object.assign(expenseToUpdate, expenseBody);

  return updatedExpense;
};

module.exports = {
  getAll,
  getExpenseById,
  getFilteredExpenses,
  addExpense,
  deleteExpense,
  updateExpense,
};
