'use strict';

let expenses = [];

function getAll() {
  return expenses;
}

function getById(expenseId) {
  const foundExpense = expenses.find(
    (expense) => expense.id === +expenseId,
  );

  return foundExpense || null;
}

function getFiltered(id, from, to, categoryTitle) {
  return expenses.filter((expense) => {
    const { userId, category, spentAt } = expense;

    if (id && userId !== +id) {
      return false;
    }

    if (categoryTitle && category !== categoryTitle) {
      return false;
    }

    if (from && to && (spentAt < from || spentAt > to)) {
      return false;
    }

    return true;
  });
}

function create(userId, spentAt, title, amount, category, note) {
  const maxId = Math.max(...expenses.map((expense) => expense.id), 0);

  const newExpense = {
    id: maxId + 1,
    userId: +userId,
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
  expenses = expenses.filter((expense) => expense.id !== +expenseId);
}

function update(expense, body) {
  Object.assign(expense, body);

  return expense;
}

function clearExpensesData() {
  expenses = [];
}

module.exports = {
  getAll,
  getById,
  create,
  getFiltered,
  remove,
  update,
  clearExpensesData,
};
