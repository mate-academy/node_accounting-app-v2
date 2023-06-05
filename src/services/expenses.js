'use strict';

let expenses = [];

const filterExpenses = ({
  userId,
  categories,
  from,
  to,
}) => {
  let filteredExpenses = expenses;

  if (userId) {
    filteredExpenses = filteredExpenses.filter(expense => (
      expense.userId.toString() === userId
    ));
  }

  if (categories) {
    filteredExpenses = filteredExpenses.filter(expense => (
      categories.includes(expense.category)
    ));
  }

  if (from && to) {
    filteredExpenses = filteredExpenses.filter(expense => {
      const expenseDate = new Date(expense.spentAt);
      const fromDate = new Date(from);
      const toDate = new Date(to);

      return expenseDate < toDate && fromDate <= expenseDate;
    });
  }

  return filteredExpenses;
};

function getById(id) {
  const foundExpenses = expenses.find((expense) => String(expense.id) === id);

  return foundExpenses || null;
}

function create(userId, spentAt, title, amount, category, note) {
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

function remove(id) {
  expenses = expenses.filter((expense) => String(expense.id) !== id);
}

function update({
  id,
  userId,
  spentAt,
  title,
  amount,
  category,
  note,
}) {
  const expense = getById(id);

  Object.assign(expense, {
    userId,
    spentAt,
    title,
    amount,
    category,
    note,
  });

  return expense;
}

function resetExpenses() {
  expenses = [];
}

module.exports = {
  filterExpenses,
  resetExpenses,
  getById,
  create,
  remove,
  update,
};
