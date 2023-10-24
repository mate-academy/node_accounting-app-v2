'use strict';

const { expenses } = require('../data/expenses.js');

const getAll = (params) => {
  const filteredExpenses = expenses
    .filter((expense) =>
      params.userId >= 0 ? expense.userId === params.userId : true,
    )
    .filter((expense) =>
      params.categories ? params.categories.includes(expense.category) : true,
    )
    .filter((expense) => (params.from ? expense.spentAt >= params.from : true))
    .filter((expense) => (params.to ? expense.spentAt <= params.to : true));

  return filteredExpenses;
};

const getOne = (id) => {
  return expenses.some((expense) => expense.id === +id)
    ? expenses.find((expense) => expense.id === +id)
    : null;
};
const addExpense = (expense) => {
  expenses.push(expense);
};

const delExpense = (id) => {
  const index = expenses.findIndex((exp) => exp.id === +id);

  if (index >= 0) {
    expenses.splice(index, 1);
  }

  return index < 0;
};

const editExpense = (expense, id) => {
  const index = expenses.findIndex((ex) => ex.id === Number(id));

  if (index >= 0) {
    const exp = expenses[index];

    Object.assign(exp, expense);

    return expenses[index];
  }
};

module.exports = {
  getAll,
  addExpense,
  getOne,
  delExpense,
  editExpense,
};
