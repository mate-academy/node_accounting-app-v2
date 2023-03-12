'use strict';

const { generateNewId } = require('../utils/generateId');

let expenses = [];

function setInitialValue(value) {
  expenses = value;
}

function getFilteredExpenses({
  userId,
  categories,
  from,
  to,
}) {
  return expenses.filter(expense => {
    const isUserIdMatch = userId
      ? expense.userId === +userId
      : true;

    const isCategoryMatch = categories
      ? categories.includes(expense.category)
      : true;

    const isFromMath = from
      ? expense.spentAt >= from
      : true;

    const isToMatch = to
      ? expense.spentAt <= to
      : true;

    return isUserIdMatch && isCategoryMatch && isFromMath && isToMatch;
  });
};

function getById(id) {
  const foundExpense = expenses.find(expense => expense.id === +id);

  return foundExpense;
}

function create(
  userId,
  spentAt,
  title,
  amount,
  category,
  note,
) {
  const id = generateNewId(expenses);
  const newExpenses = {
    id,
    userId,
    spentAt,
    title,
    amount,
    category,
    note,
  };

  expenses.push(newExpenses);

  return newExpenses;
}

function update({ id, newData }) {
  const foundExpense = getById(id);

  Object.assign(foundExpense, { ...newData });

  return foundExpense;
}

function remove(id) {
  expenses = expenses.filter(expense => expense.id !== +id);
}

module.exports = {
  getFilteredExpenses,
  getById,
  create,
  update,
  remove,
  setInitialValue,
};
