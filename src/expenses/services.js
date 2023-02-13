'use strict';

const expenses = [];
let id = 0;

const getExpenses = (idOfUser, from, to, categories) => {
  return expenses.reduce((acc, expense) => {
    const { userId, spentAt, category } = expense;

    const condition1 = idOfUser
      ? idOfUser === userId
      : true;

    const condition2 = from
      ? new Date(from).getTime() < new Date(spentAt).getTime()
      : true;

    const condition3 = to
      ? new Date(to).getTime() > new Date(spentAt).getTime()
      : true;

    const condition4 = categories
      ? categories.includes(category)
      : true;

    const mainCondition = condition1 && condition2 && condition3 && condition4;

    if (mainCondition) {
      return [...acc, expense];
    } else {
      return acc;
    }
  }, []);
};

const createExpenses = (expense) => {
  const newId = id++;
  const newExpense = {
    id: newId,
    ...expense,
  };

  expenses.push(newExpense);

  return newExpense;
};

const getExpense = (expenseId) => {
  return expenses.find(expense => expense.id === expenseId);
};

const resetExpenses = () => {
  expenses.length = 0;
};

const deleteExpense = (expenseId) => {
  const foundExpense = getExpense(expenseId);

  if (!foundExpense) {
    throw new Error('can\'t find an expense');
  }

  const index = expenses.indexOf(foundExpense);

  return expenses.splice(index, 1);
};

const updateExpense = (expenseId, dataToUpdate) => {
  const foundExpense = getExpense(expenseId);

  if (!foundExpense) {
    throw new Error('can\'t find an expense');
  }

  return Object.assign(foundExpense, dataToUpdate);
};

module.exports = {
  resetExpenses,
  getExpenses,
  createExpenses,
  getExpense,
  deleteExpense,
  updateExpense,
};
