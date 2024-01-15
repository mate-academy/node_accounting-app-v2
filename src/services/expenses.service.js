'use strict';

const { getNewId } = require('../helpers');

let expenses = [];
const setInitialExpenses = () => {
  expenses = [];
};

class ExpenseService {
  findAll({ userId, from, to, categories }) {
    if (userId || from || to || categories) {
      expenses = expenses.filter(expense => {
        const isMatchedUser = userId
          ? expense.userId === +userId
          : true;
        const isMatchedDates = from && to
          ? expense.spentAt >= from && expense.spentAt <= to
          : true;
        const isMatchedCategory = categories
          ? categories.includes(expense.category)
          : true;

        return isMatchedUser && isMatchedCategory && isMatchedDates;
      });
    }

    return expenses;
  }

  findById(id) {
    return expenses.find(expense => expense.id === +id);
  }

  create(newExpenseData) {
    const newExpense = {
      id: getNewId(expenses),
      ...newExpenseData,
    };

    expenses.push(newExpense);

    return newExpense;
  }

  remove(id) {
    expenses = expenses.filter(expense => expense.id !== +id);
  }

  update(foundExpense, newExpenseData) {
    Object.assign(foundExpense, { ...newExpenseData });

    return foundExpense;
  }
}

module.exports = {
  ExpenseService,
  setInitialExpenses,
};
