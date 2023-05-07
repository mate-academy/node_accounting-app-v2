'use strict';

let expenses = [];

function removeAll() {
  expenses = [];
}

function getFiltered(userId, categories, from, to) {
  if (userId) {
    expenses = expenses.filter((expense) => (
      expense.userId === +userId
    ));
  }

  if (categories) {
    expenses = expenses.filter(({ category }) => (
      categories.includes(category)
    ));
  }

  if (from && to) {
    expenses = expenses.filter(({ spentAt }) => {
      const thisDate = new Date(spentAt).getTime();
      const fromDate = new Date(from).getTime();
      const toDate = new Date(to).getTime();

      return fromDate < thisDate && thisDate < toDate;
    });
  }

  return expenses;
}

function create({
  userId,
  title,
  spentAt,
  amount,
  category,
  note,
}) {
  const maxId = expenses.length ? expenses.length : 0;

  const newExpense = {
    id: maxId + 1,
    userId,
    title,
    spentAt,
    amount,
    category,
    note,
  };

  expenses.push(newExpense);

  return newExpense;
}

function getById(expenseId) {
  const expense = expenses.find(({ id }) => id === +expenseId);

  return expense || null;
}

function remove(expenseId) {
  expenses = expenses.filter((expense) => (
    expense.id !== +expenseId
  ));
}

function update(expenseId, requestBody) {
  const expense = getById(expenseId);
  const {
    spentAt = expense.spentAt,
    title = expense.title,
    amount = expense.amount,
    category = expense.category,
    note = expense.note,
  } = requestBody;

  Object.assign(expense, {
    spentAt,
    title,
    amount,
    category,
    note,
  });

  return expense;
}

module.exports = {
  removeAll,
  getFiltered,
  getById,
  create,
  remove,
  update,
};
