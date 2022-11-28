'use strict';

let expenses = [];

function getAll() {
  return expenses;
}

function getFiltered(searchParams) {
  const { userId, category } = searchParams;

  let filteredExpenses = expenses;

  if (category) {
    filteredExpenses = filteredExpenses.filter(
      expense => expense.category === category
    );
  }

  if (userId) {
    filteredExpenses = filteredExpenses.filter(
      expense => expense.userId === +userId
    );
  }

  return filteredExpenses;
}

function getById(expensesId) {
  const foundUser = expenses.find(expense => expense.id === +expensesId);

  return foundUser;
}

function create(
  userId,
  spentAt,
  title,
  amount,
  category,
  note,
) {
  const newId = expenses.length > 0
    ? Math.max(...expenses.map(expense => expense.id)) + 1
    : 0;

  const newExpense = {
    id: newId,
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

function remove(expensesId) {
  expenses = expenses.filter(expense => expense.id !== +expensesId);
}

function update(expensesId, data) {
  const expense = getById(expensesId);

  Object.assign(expense, data);

  return expense;
}

module.exports = {
  getAll,
  getFiltered,
  getById,
  create,
  remove,
  update,
};
