'use strict';

let expenses = [];
let newExpensesId = 1;

const expensesServices = {
  getAll: () => expenses,
  getOne: (id) => expenses.find(expense => expense.id === +id),
  create: (body) => {
    const {
      userId,
      spentAt,
      title,
      amount,
      category,
      note,
    } = body;

    const newExpense = {
      userId,
      spentAt,
      title,
      amount,
      category,
      note,
      id: newExpensesId++,
    };

    if (!title) {
      return null;
    }

    expenses.push(newExpense);

    return newExpense;
  },

  remove: (id) => {
    if (!expensesServices.getOne(id)) {
      return null;
    };

    const filteredExpenses = expenses.filter(expense => expense.id !== +id);

    expenses = filteredExpenses;

    return expenses;
  },

  reset: () => {
    expenses = [];
  },
};

module.exports = {
  expensesServices,
};
