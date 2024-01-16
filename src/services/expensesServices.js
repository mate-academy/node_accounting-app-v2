'use strict';

let expenses = [];

const getAllExpenses = (userId, categories, from, to) => {
  let preparedExpenses = expenses;

  if (userId) {
    preparedExpenses
      = preparedExpenses.filter((expense) => expense.userId === +userId);
  }

  if (categories) {
    preparedExpenses = preparedExpenses.filter((expense) =>
      categories.includes(expense.category)
    );
  }

  if (from && to) {
    preparedExpenses = preparedExpenses.filter(
      (expense) =>
        new Date(expense.spentAt) >= new Date(from)
        && new Date(expense.spentAt) <= new Date(to)
    );
  }

  return preparedExpenses;
};

const getExpenseById = (id) => {
  return expenses.find(expense => expense.id === +id) || null;
};

const postNewExpense = ({
  userId,
  spentAt,
  title,
  amount,
  category,
  note,
}) => {
  const NewId = expenses.length
    ? Math.max(...expenses.map((expense) => expense.id)) + 1
    : 0;

  const newExpense = {
    id: NewId,
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

const deleteExpense = (id) => {
  expenses = expenses.filter(user => user.id !== +id);
};

const updateExpense = (expense, title) => Object.assign(expense, { title });

const clearExpenses = () => {
  expenses = [];
};

module.exports = {
  getAllExpenses,
  getExpenseById,
  postNewExpense,
  deleteExpense,
  updateExpense,
  clearExpenses,
};
