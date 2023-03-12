'use strict';

let expenses = [];

function getAll() {
  return expenses;
}

function getById(expenseId) {
  const foundExpense = expenses.find(
    (expense) => expense.id === Number(expenseId),
  );

  return foundExpense || null;
}

function getFiltered(userId, from, to, category) {
  const filteredExpenses = expenses.filter((expense) => {
    const { spentAt } = expense;

    if (userId && expense.userId !== Number(userId)) {
      return false;
    }

    if (category && expense.category !== category) {
      return false;
    }

    if (
      from
      && to
      && (spentAt.localeCompare(from) === -1 || spentAt.localeCompare(to) === 1)
    ) {
      return false;
    }

    return true;
  });

  return filteredExpenses;
}

function create(userId, spentAt, title, amount, category, note) {
  const maxId = Math.max(0, ...expenses.map((expense) => expense.id));

  const newExpense = {
    id: maxId + 1,
    userId: Number(userId),
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
  expenses = expenses.filter((expense) => expense.id !== Number(expenseId));
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
