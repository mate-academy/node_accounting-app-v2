'use strict';

let expenses = [];
let nextExpenseId = 1;

const findExpense = (expenseId) => {
  return expenses.find(expense => expense.id === +expenseId);
};

const getAll = () => {
  return expenses;
};

const getFilteredExpenses = (
  userId,
  categories,
  from,
  to,
) => {
  let expensesToSend = expenses;

  if (userId) {
    expensesToSend = expensesToSend.filter(expense =>
      expense.userId === +userId
    );
  }

  if (categories) {
    expensesToSend = expensesToSend.filter(expense =>
      categories.includes(expense.category)
    );
  }

  if (from) {
    const dateFrom = new Date(from);

    expensesToSend = expensesToSend.filter(expense => {
      const expenseDate = new Date(expense.spentAt);

      return expenseDate >= dateFrom;
    });
  }

  if (to) {
    const dateTo = new Date(to);

    expensesToSend = expensesToSend.filter(expense => {
      const expenseDate = new Date(expense.spentAt);

      return expenseDate <= dateTo;
    });
  }

  return expensesToSend;
};

const createExpense = (expense) => {
  const id = nextExpenseId++;

  const newExpense = {
    ...expense,
    id,
  };

  expenses.push(newExpense);

  return newExpense;
};

const deleteExpenses = (id) => {
  expenses = expenses.filter(expense => expense.id !== +id);
};

const clearExpenses = () => {
  expenses = [];
};

module.exports = {
  findExpense,
  getAll,
  getFilteredExpenses,
  createExpense,
  deleteExpenses,
  clearExpenses,
};
