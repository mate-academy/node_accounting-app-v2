const expensesData = require('../resources/expenseData');
const { expenses, expenseCount } = expensesData;

const getAllExpenses = ({ userId, categories, from, to }) => {
  return expenses.filter((expense) => {
    if (userId && expense.userId !== userId) {
      return false;
    }

    if (categories && !categories.includes(expense.category)) {
      return false;
    }

    if (from && new Date(expense.spentAt) < from) {
      return false;
    }

    if (to && new Date(expense.spentAt) > to) {
      return false;
    }

    return true;
  });
};

const getOneExpense = (id) => {
  return expenses.find((e) => e.id === id) || null;
};

const createExpense = (expenseItem) => {
  const newItem = {
    id: expenseCount(), // Fixed: Call expenseCount as function
    ...expenseItem,
  };

  expenses.push(newItem);
  expensesData.incrementCount();

  return newItem;
};

const updateExpense = (id, paramsToUpdate) => {
  const itemToUpdate = expenses.find((e) => e.id === id);

  Object.assign(itemToUpdate, paramsToUpdate);

  return itemToUpdate; // Return the updated item
};

const deleteExpense = (id) => {
  const index = expenses.findIndex((e) => e.id === id);

  if (index === -1) {
    return null;
  }

  const deletedExpense = expenses.splice(index, 1);

  return deletedExpense[0];
};

module.exports = {
  getAllExpenses,
  getOneExpense,
  createExpense,
  updateExpense,
  deleteExpense,
};
