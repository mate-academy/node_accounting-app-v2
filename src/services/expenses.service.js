'use strict';

let expenses = [];

const expansesService = {
  get: (userId, categories, from, to) => {
    const res = expenses.filter(expense => {
      if (userId && +expense.userId !== +userId) {
        return false;
      }

      const timeFrom = from ? new Date(from) : null;
      const timeTo = to ? new Date(to) : null;
      const timeDate = new Date(expense.spentAt);

      if (timeFrom && timeFrom > timeDate) {
        return false;
      }

      if (timeTo && timeTo < timeDate) {
        return false;
      }

      if (categories
        && categories.length
        && !categories.includes(expense.category)) {
        return false;
      }

      return true;
    }
    );

    return res;
  },
  getById: (id) => {
    const expense = expenses.find(item => +item.id === +id);

    return expense;
  },
  createExpense: (newExpense) => {
    const expenseWithId = {
      ...newExpense, id: Math.random(),
    };

    expenses.push(expenseWithId);

    return expenseWithId;
  },

  remove: (id) => {
    expenses = expenses.filter(expense => +expense.id !== +id);
  },

  update: (newExpenseData, id) => {
    let updatedExpense;

    const updatedExpenses = expenses.map(expense => {
      if (+expense.id === +id) {
        updatedExpense = {
          ...expense,
          ...newExpenseData,
        };

        return updatedExpense;
      }

      return expense;
    });

    expenses = updatedExpenses;

    return updatedExpense;
  },
};

module.exports = expansesService;
