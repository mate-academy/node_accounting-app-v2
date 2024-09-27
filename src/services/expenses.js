'use strict';

let expenses = [];

const resetExpenses = () => {
  expenses = [];
};

const findExpensesById = (id) => (
  expenses.find(findExpense => findExpense.id === +id) || null
);

const getNewId = () => {
  return Math.max(expenses.map(e => e.id)) + 1;
};

function getAll(query) {
  const { userId, categories, from, to } = query;
  let filteredExpenses = expenses;

  if (userId) {
    filteredExpenses = filteredExpenses
      .filter(expense => expense.userId === +userId);
  }

  if (categories) {
    const categoriesArr = Array.isArray(categories)
      ? categories
      : [categories];

    filteredExpenses = filteredExpenses
      .filter(expense => categoriesArr.includes(expense.category));
  }

  const fromDate = new Date(from);
  const toDate = new Date(to);

  if (from && !isNaN(fromDate)) {
    filteredExpenses = filteredExpenses
      .filter(expense => {
        return expense.spentAt > fromDate;
      });
  }

  if (to && !isNaN(toDate)) {
    filteredExpenses = filteredExpenses
      .filter(expense => expense.spentAt < toDate);
  }

  return filteredExpenses;
}

function create(newExpense) {
  newExpense.id = getNewId();
  expenses.push(newExpense);

  return newExpense;
}

function remove(id) {
  expenses = expenses.filter(filteredExpenses => filteredExpenses.id !== id);
}

function update(bodyRequest, expense) {
  const {
    userId,
    spentAt,
    title,
    amount,
    category,
    note,
  } = bodyRequest;
  const spentAtDate = new Date(spentAt);

  expense.userId = +userId || expense.userId;
  expense.title = title || expense.title;
  expense.amount = amount || expense.amount;
  expense.category = category || expense.category;
  expense.note = note || expense.note;

  expense.spentAt = isFinite(spentAtDate)
    ? spentAtDate
    : expense.spentAt;
}

module.exports = {
  getAll,
  findExpensesById,
  resetExpenses,
  create,
  remove,
  update,
};
