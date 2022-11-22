'use strict';

let expenses = [];

function getAll() {
  return expenses;
}

function getById(expenseId) {
  const foundExpense = expenses.find(expense => expense.id === +expenseId);

  return foundExpense || null;
}

function getFiltered(searchParams) {
  const { userId, from, to, category } = searchParams;
  let filteredExpenses;

  if (userId) {
    filteredExpenses = expenses.filter(e => e.userId === +userId);
  }

  if (category) {
    filteredExpenses = filteredExpenses.filter(e => e.category === category);
  }

  if (from && to) {
    const fromDate = new Date(from);
    const toDate = new Date(to);

    filteredExpenses = expenses.filter(e => {
      const spentAtDate = new Date(e.spentAt);

      return spentAtDate >= fromDate && spentAtDate <= toDate;
    });
  }

  return filteredExpenses;
}

function create(userId, spentAt, title, amount, category, note) {
  const maxId = expenses.length
    ? Math.max(...expenses.map(expense => expense.id))
    : 0;
  const newExpense = {
    id: maxId + 1,
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

function remove(expenseId) {
  expenses = expenses.filter(expense => expense.id !== expenseId);
}

function update(expense, expenseBody) {
  Object.assign(expense, expenseBody);

  return expense;
}

module.exports = {
  getAll,
  getById,
  create,
  getFiltered,
  remove,
  update,
};
