'use strict';

const expenseServices = {
};

expenseServices.newLocaleStorage = function() {
  this.expenses = [];
};

expenseServices.addExpense = (expense) => {
  const id = expenseServices.expenses.length;

  const newExpense = {
    id,
    ...expense,
  };

  expenseServices.expenses.push(newExpense);

  return newExpense;
};

expenseServices.getAllExpenses = () => {
  return expenseServices.expenses;
};

expenseServices.getExpensesByUserId = (id) => {
  const query = Number(id);
  const allExpenses = expenseServices.getAllExpenses();
  const filteredByUserId = allExpenses
    .filter((expense) => expense.userId === query);

  return filteredByUserId;
};

expenseServices.getExpenseById = (id) => {
  const query = Number(id);
  const allExpenses = expenseServices.getAllExpenses();
  const foundExpense = allExpenses
    .find((expense) => expense.id === query);

  return foundExpense;
};

expenseServices.updateExpense = (id, updatedFields) => {
  const expenseToUpdate = expenseServices.getExpenseById(id);

  if (!expenseToUpdate) {
    return null;
  }

  Object.assign(expenseToUpdate, updatedFields);

  return expenseToUpdate;
};

expenseServices.deleteExpense = (id) => {
  const query = Number(id);

  const deletedExpense = expenseServices.getExpenseById(query);

  expenseServices.expenses = expenseServices.expenses
    .filter((expense) =>
      expense.id !== query);

  return deletedExpense;
};

module.exports = {
  expenseServices,
};
