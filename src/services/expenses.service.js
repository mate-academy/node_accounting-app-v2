const { createId } = require('../utils/id.service');

let expenses = [];

const resetExpenses = () => {
  expenses = [];
};

const getExpenses = () => {
  return expenses;
};

const getExpense = (id) => {
  return expenses.find((elem) => elem.id === id);
};
const addExpense = (elem) => {
  const elemWithId = {
    id: createId(expenses),
    ...elem,
  };

  expenses.push(elemWithId);

  return elemWithId;
};
const updateExpense = (newElem) => {
  const { id } = newElem;

  expenses = expenses.map((elem) => (elem.id === +id ? newElem : elem));

  return newElem;
};
const deleteExpense = (id) => {
  const index = expenses.findIndex((elem) => elem.id === id);

  if (index !== -1) {
    expenses.splice(index, 1);
  }

  return expenses;
};

function filterExpenses(params) {
  const { userId, categories, from, to } = params;
  let expensesCopy = [...expenses];

  if (userId) {
    expensesCopy = expensesCopy.filter((expense) => expense.userId === +userId);
  }

  if (categories) {
    expensesCopy = expensesCopy.filter(
      (expense) =>
        // eslint-disable-next-line comma-dangle
        categories.includes(expense.category),
      // eslint-disable-next-line function-paren-newline
    );
  }

  if (from) {
    expensesCopy = expensesCopy.filter((expense) => expense.spentAt > from);
  }

  if (to) {
    expensesCopy = expensesCopy.filter((expense) => expense.spentAt < to);
  }

  return expensesCopy;
}

module.exports = {
  resetExpenses,
  getExpenses,
  getExpense,
  addExpense,
  updateExpense,
  deleteExpense,
  filterExpenses,
};
