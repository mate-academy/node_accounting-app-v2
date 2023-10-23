'use strict';

const expenses = [];

const getExpenses = () => expenses;

const getSingleExpense = (expenseId) => expenses.find(e => e.id === expenseId);

const addExpense = (expense) => expenses.push(expense);

const deleteExpense = (expenseIndex) => expenses.splice(expenseIndex, 1);

const updateExpense = (index, spendAt, title, amount, category, note) => (
  expenses[index] = {
    ...expenses[index],
    spendAt: expenses[index].spendAt,
    title: expenses[index].title,
    amount: expenses[index].amount,
    category: expenses[index].category,
    note: expenses[index].note,
  }
);

const indexOfExpense = (expenseId) => expenses.findIndex(
  e => e.id === Number(expenseId));

const deleteExpenses = () => {
  expenses.length = 0;
};

const expensesService = {
  expenses,
  getExpenses,
  getSingleExpense,
  addExpense,
  deleteExpense,
  updateExpense,
  indexOfExpense,
  deleteExpenses,
};

module.exports = { expensesService };
