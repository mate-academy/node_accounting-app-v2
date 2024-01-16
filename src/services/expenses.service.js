'use strict';

const { getNewId } = require('../helpers/getNewId');

let expenses = [];

function clearAllExpenses() {
  expenses = [];
}

function getAllExpenses(userId, categories, from, to) {
  let filteredExpenses = [...expenses];

  if (categories) {
    filteredExpenses = filteredExpenses.filter(
      expense => categories.includes(expense.category)
    );
  }

  if (userId) {
    filteredExpenses = filteredExpenses.filter(
      expense => expense.userId === +userId
    );
  }

  if (from && to) {
    const toDate = new Date(to);
    const fromDate = new Date(from);

    filteredExpenses = filteredExpenses.filter(
      expense => {
        const spentDate = new Date(expense.spentAt);

        return spentDate >= fromDate
          && spentDate <= toDate;
      }
    );
  }

  if (!filteredExpenses.length) {
    return expenses;
  }

  return filteredExpenses;
}

function getExpenseById(id) {
  return expenses.find(expense => expense.id === +id);
}

function createExpense({
  name,
  userId,
  spentAt,
  title,
  amount,
  category,
  note,
}) {
  const newExpense = {
    id: getNewId(expenses),
    userId,
    spentAt,
    title,
    amount,
    category,
    note: note || '',
  };

  expenses.push(newExpense);

  return newExpense;
}

function updateExpense({
  id,
  spentAt,
  title,
  amount,
  category,
  note,
}) {
  const expenseToUpdate = getExpenseById(+id);

  if (spentAt) {
    expenseToUpdate.spentAt = spentAt;
  }

  if (title) {
    expenseToUpdate.title = title;
  }

  if (amount) {
    expenseToUpdate.amount = amount;
  }

  if (category) {
    expenseToUpdate.category = category;
  }

  if (note) {
    expenseToUpdate.note = note;
  }

  return expenseToUpdate;
}

function removeExpense(id) {
  const newExpenses = expenses.filter(expense => expense.id !== +id);

  expenses = [...newExpenses];
}

module.exports = {
  getAllExpenses,
  getExpenseById,
  createExpense,
  updateExpense,
  removeExpense,
  clearAllExpenses,
};
