/* eslint-disable function-paren-newline */
const { createUniqueID } = require('../utils/createUniqueID');

let expenses = [];

const init = () => {
  expenses = [];
};

const getAll = (query) => {
  let preparedExpenses = expenses;

  const { userId: id, categories, from, to } = query;
  const isQueryExist = id || categories || from || to;
  const fromDate = new Date(from);
  const toDate = new Date(to);

  const earliestDate = from
    ? fromDate.toISOString()
    : new Date(0).toISOString();
  const latestDate = to ? toDate.toISOString() : new Date().toISOString();

  if (isQueryExist) {
    preparedExpenses = preparedExpenses.filter(
      ({ userId, category, spentAt }) => {
        let isRelevant = true;

        if (id) {
          isRelevant = userId === Number(id);
        }

        if (categories) {
          isRelevant = categories.includes(category);
        }

        if (from || to) {
          isRelevant = spentAt >= earliestDate && spentAt <= latestDate;
        }

        return isRelevant;
      },
    );
  }

  return preparedExpenses;
};

const getById = (id) => {
  return expenses.find((expense) => expense.id === Number(id)) || null;
};

const create = (expense) => {
  const newExpense = { id: createUniqueID(), ...expense };

  expenses.push(newExpense);

  return newExpense;
};

const update = (fieldsToUpdate) => {
  const updatingExpense =
    expenses.find((expense) => expense.id === fieldsToUpdate.id) || null;

  Object.assign(updatingExpense, fieldsToUpdate);

  return updatingExpense;
};

const remove = (id) => {
  expenses = expenses.filter((expense) => expense.id !== Number(id));
};

module.exports = {
  init,
  getAll,
  getById,
  create,
  remove,
  update,
};
