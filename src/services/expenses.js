'use strict';

const generateId = () => {
  if (expenses.length < 1) {
    return 1;
  }

  const maxId = Math.max(...expenses.map(expense => expense.id));

  return maxId + 1;
};

let expenses = [];

function getAll({ userId, categories, from, to }) {
  let filteredExpenses = [ ...expenses ];

  if (userId) {
    filteredExpenses = filteredExpenses
      .filter(expense => expense.userId === +userId);
  };

  if (categories) {
    filteredExpenses = filteredExpenses
      .filter(expense => categories.includes(expense.category));
  };

  if (from) {
    filteredExpenses = filteredExpenses
      .filter(expense => expense.spentAt >= from);
  };

  if (to) {
    filteredExpenses = filteredExpenses
      .filter(expense => expense.spentAt <= to);
  };

  return filteredExpenses;
}

function getById(expenseId) {
  return expenses.find(expense => expense.id === expenseId);
}

function create({
  userId, spentAt, title, amount, category, note,
}) {
  const newExpense = {
    id: generateId(),
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

function update(expenseId, newExpense) {
  const foundExpense = getById(expenseId);

  Object.assign(foundExpense, { ...newExpense });
}

function deleteAll() {
  expenses = [];
}

module.exports = {
  getAll,
  getById,
  create,
  remove,
  update,
  deleteAll,
};
