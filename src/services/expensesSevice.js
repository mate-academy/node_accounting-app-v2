'use strict';

let expenses = [];

function getExpenses(filters = {}) {
  const { userId, from, to, categories } = filters;

  let result = expenses;

  if (userId) {
    result = result.filter((e) => e.userId === userId);
  }

  if (from && to) {
    const fromDate = new Date(from);
    const toDate = new Date(to);

    result = result.filter((e) => {
      const spentAt = new Date(e.spentAt);

      return spentAt >= fromDate && spentAt <= toDate;
    });
  }

  if (categories) {
    const list = categories.split(',');

    result = result.filter((e) => list.includes(e.category));
  }

  return result;
}

function getExpensesById(id) {
  return expenses.find((expense) => expense.id === id);
}

function createExpense(userId, spentAt, title, amount, category, note) {
  const newExpense = {
    id: expenses.length + 1,
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

function deleteExpenseById(id) {
  const index = expenses.findIndex((e) => e.id === id);

  if (index === -1) {
    return;
  }

  const [expense] = expenses.splice(index, 1);

  return expense;
}

function updateExpenseById({ id, spentAt, title, amount, category, note }) {
  const expense = expenses.find((e) => e.id === id);

  if (!expense) {
    return;
  }

  if (spentAt !== undefined) {
    expense.spentAt = spentAt;
  }

  if (title !== undefined) {
    expense.title = title;
  }

  if (amount !== undefined) {
    expense.amount = amount;
  }

  if (category !== undefined) {
    expense.category = category;
  }

  if (note !== undefined) {
    expense.note = note;
  }

  return expense;
}

const resetExpenses = () => {
  expenses = [];
};

module.exports = {
  getExpenses,
  getExpensesById,
  createExpense,
  deleteExpenseById,
  updateExpenseById,
  resetExpenses,
};
