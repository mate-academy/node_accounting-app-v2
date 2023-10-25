'use strict';

const expenses = [];

function getExpenses() {
  return expenses;
};

function getUserById(expenceId) {
  return expenses.find(e => e.id === +expenceId);
};

function addNewExpense(newExpense) {
  return expenses.push(newExpense);
};

function getExpenseById(id) {
  return expenses.findIndex(e => e.id === +id);
};

function updateExpenseProps(index, spentAt, title, amount, category, note) {
  return (
    expenses[index] = {
      ...expenses[index],
      spentAt: spentAt || expenses[index].spentAt,
      title: title || expenses[index].title,
      amount: amount || expenses[index].amount,
      category: category || expenses[index].category,
      note: note || expenses[index].note,
    }
  );
}

function deleteExpenseByIndex(index) {
  return expenses.splice(index, 1);
};

function clearExpenses() {
  return expenses.splice(0);
};

const expensesService = {
  getExpenses,
  getUserById,
  addNewExpense,
  getExpenseById,
  updateExpenseProps,
  deleteExpenseByIndex,
  clearExpenses,
  expenses,
};

module.exports = {
  expensesService,
};
