'use strict';

let expenses = [];

const getAllExpenses = (userId, categories, from, to) => {
  let filteredExpenses = expenses;

  if (userId) {
    filteredExpenses
      = filteredExpenses.filter((expense) => expense.userId === +userId);
  }

  if (categories) {
    filteredExpenses = filteredExpenses.filter((expense) =>
      categories.includes(expense.category)
    );
  }

  if (from && to) {
    filteredExpenses = filteredExpenses.filter(
      (expense) =>
        new Date(expense.spentAt) >= new Date(from)
        && new Date(expense.spentAt) <= new Date(to)
    );
  }

  return filteredExpenses;
};

const getExpenseById = (id) => (
  expenses.find((expense) => expense.id === +id) || null
);

const addNewExpense = ({
  userId,
  spentAt,
  title,
  amount,
  category,
  note,
}) => {
  const getNewExpenseId = expenses.length
    ? Math.max(...expenses.map((expense) => expense.id)) + 1
    : 0;

  const newExpense = {
    id: getNewExpenseId,
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

const removeExpense = (id) => {
  const newExpenses = expenses.filter(user => user.id !== +id);

  expenses = newExpenses;
};

const updateExpense = (expense, title) => Object.assign(expense, { title });

const clearExpenses = () => {
  expenses = [];
};

module.exports = {
  getAllExpenses,
  getExpenseById,
  addNewExpense,
  removeExpense,
  updateExpense,
  clearExpenses,
};
