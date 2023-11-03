'use strict';

const { getAllUsers } = require('./userService');

let expenses = [];

const clearExpenses = () => {
  expenses = [];
};
const convertStringToDate = (string) => new Date(string);
const getAllExpenses = () => expenses;
const getFilteredExpenses = (userId, categories, from, to) => {
  const filteredExpenses = expenses.filter((expense) => {
    const fromDate = convertStringToDate(from);
    const toDate = convertStringToDate(to);
    const spentAtDate = convertStringToDate(expense.spentAt);
    let checkDateRange = true;
    let checkUserId = true;

    if (userId) {
      checkUserId = expense.userId === Number(userId);
    }

    if (from && !to) {
      checkDateRange = spentAtDate > fromDate;
    } else if (to && !from) {
      checkDateRange = spentAtDate < toDate;
    } else if (from && to) {
      checkDateRange = spentAtDate < toDate && spentAtDate > fromDate;
    }

    const getCorrectCategory = () => {
      if (!categories) {
        return true;
      }

      if (typeof categories === 'string') {
        return categories === expense.category;
      }

      return categories.some((category) => category === expense.category);
    };

    return checkUserId && checkDateRange && getCorrectCategory();
  });

  return filteredExpenses;
};
const addNewExpense = (newExpense) => expenses.push(newExpense);
const isUserIdExists = (userId) =>
  getAllUsers().find((user) => user.id === Number(userId));
const getExpenseById = (id) =>
  expenses.find((expense) => expense.id === Number(id)) || null;
const findIndexOfExpense = (id) =>
  expenses.findIndex((expense) => expense.id === Number(id)) || null;
const removeExpense = (index) => expenses.splice(index, 1);
const patchExpense = (updatedValues, id) => {
  expenses.forEach((expense) => {
    if (expense.id === Number(id)) {
      Object.assign(expense, updatedValues);
    }
  });
};

module.exports = {
  getFilteredExpenses,
  getAllExpenses,
  addNewExpense,
  isUserIdExists,
  getExpenseById,
  findIndexOfExpense,
  removeExpense,
  patchExpense,
  clearExpenses,
};
