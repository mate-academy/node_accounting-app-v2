'use strict';

let expenses = [];

function getAllByFilter({
  userId,
  from,
  to,
  categories,
}) {
  const filteredExpenses = expenses;

  if (userId) {
    return filteredExpenses.filter(expense => expense.userId === +userId);
  }

  if (categories) {
    return filteredExpenses.filter(expense => (
      categories.includes(expense.category)
    ));
  }

  if (to) {
    const toDate = new Date(to);

    return filteredExpenses.filter(expense => {
      const targetDate = new Date(expense.spentAt);

      return targetDate <= toDate;
    });
  }

  if (from) {
    const fromDate = new Date(from);

    return filteredExpenses.filter(expense => {
      const targetDate = new Date(expense.spentAt);

      return targetDate >= fromDate;
    });
  }

  if (from && to) {
    const fromDate = new Date(from);
    const toDate = new Date(to);

    return filteredExpenses.filter(expense => {
      const targetDate = new Date(expense.spentAt);

      return targetDate >= fromDate && targetDate <= toDate;
    });
  }

  if (filteredExpenses.length === 0) {
    return [];
  }

  return filteredExpenses;
}

function getById(expensesId) {
  const foundExpense = expenses.find(expense => expense.id === +expensesId);

  return foundExpense || null;
}

function create({
  userId,
  spentAt,
  title,
  amount,
  category,
  note,
}) {
  const newId = expenses.length + 1;

  const newExpense = {
    id: newId,
    userId,
    spentAt,
    title,
    amount,
    category,
    note,
  };

  expenses.push(newExpense);

  return newExpense;
}

function remove(expenseId) {
  expenses = expenses.filter(expense => expense.id !== +expenseId);
}

function update({ id, ...updates }) {
  const expense = getById(id);

  Object.assign(expense, updates);

  return expense;
}

module.exports = {
  getAllByFilter, getById, create, remove, update,
};
