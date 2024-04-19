'use strict';

let expenses = [];
let expensesCounter = 0;

const getExpenses = ({ userId, from, to, categories }) => {
  let returnExpenses = [...expenses];

  if (userId) {
    returnExpenses = returnExpenses.filter(el => el.userId === +userId);
  }

  if (from) {
    returnExpenses = returnExpenses.filter(el => el.spentAt > from);
  }

  if (to) {
    returnExpenses = returnExpenses.filter(el => el.spentAt < to);
  }

  if (categories) {
    returnExpenses = returnExpenses.filter(el => el.category === categories);
  }

  return returnExpenses;
};

const getExpenseById
  = (id) => expenses.find(expense => expense.id === +id) || null;

const createExpense = (data) => {
  const newExpense = {
    id: ++expensesCounter,
    ...data,
  };

  expenses.push(newExpense);

  return newExpense;
};

const removeExpense = (id) => {
  expenses = expenses.filter(el => el.id !== +id);

  return expenses;
};

const updateExpense = (id, data) => {
  let newExpense = {};

  expenses = expenses.map(expense => {
    if (expense.id === +id) {
      newExpense = {
        ...expense,
        userId: data.userId || expense.userId,
        spentAt: data.spentAt || expense.spentAt,
        title: data.title || expense.title,
        amount: data.amount || expense.amount,
        category: data.category || expense.category,
        note: data.note || expense.note,
      };

      return newExpense;
    }

    return expense;
  });

  return newExpense;
};

const resetExpenses = () => {
  expenses = [];
};

module.exports = {
  getExpenses,
  getExpenseById,
  createExpense,
  removeExpense,
  updateExpense,
  resetExpenses,
};
