'use strict';

const expenses = [];

const get = ({ userId, categories, from, to }) => {
  return expenses.filter(expense => {
    const fromDate = new Date(from);
    const toDate = new Date(to);
    const currentDate = new Date(expense.spentAt);

    const isCorrectUser = userId !== undefined
      ? expense.userId === +userId
      : true;

    const isInCategories = categories
      ? categories.includes(expense.category)
      : true;

    const isInDateBoundaries = (from && to)
      ? (
        fromDate.getTime() < currentDate.getTime()
        && currentDate.getTime() < toDate.getTime()
      )
      : true;

    return isCorrectUser && isInCategories && isInDateBoundaries;
  });
};

const getById = ({ id }) => {
  return expenses.find(expense => expense.id === id) || null;
};

const create = ({ title, amount, category, note, spentAt, userId }) => {
  let nextID = 0;

  if (expenses.length > 0) {
    nextID = expenses.sort((a, b) => a.id - b.id).at(-1).id + 1;
  }

  expenses.push({
    id: nextID, title, amount, category, note, spentAt, userId,
  });

  return getById({ id: nextID });
};

const update = ({ id, newParams }) => {
  const expense = getById({ id });

  if (expense) {
    expenses.forEach(expenseItem => {
      if (expenseItem.id === id) {
        for (const [k, v] of Object.entries(newParams)) {
          expenseItem[k] = v;
        }
      }
    });

    return getById({ id });
  }

  return null;
};

const remove = ({ id }) => {
  const index = expenses.findIndex(expense => expense.id === id);

  expenses.splice(index, 1);

  return index;
};

module.exports = {
  get,
  getById,
  create,
  update,
  remove,
};
