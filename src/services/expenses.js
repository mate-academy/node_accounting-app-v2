'use strict';

let expenses = [];

const expenseService = {
  getEmptyExpenses() {
    expenses = [];
  },

  getAll() {
    return expenses;
  },

  filterAllByUserId(userId) {
    return expenses.filter(
      expense => expense.userId === +userId,
    );
  },

  filterAllByDate(from, to) {
    const start = Date.parse(from);
    const end = Date.parse(to);

    return expenses.filter(expense => {
      const currentDate = Date.parse(expense.spentAt);

      return currentDate.valueOf() >= start.valueOf()
        && currentDate.valueOf() <= end.valueOf();
    });
  },

  filterAllByCategory(category) {
    return expenses.filter(
      expense => expense.category === category,
    );
  },

  getById(expensesId) {
    const foundExpense = expenses.find(expense => expense.id === +expensesId);

    return foundExpense || null;
  },

  create(body) {
    const {
      userId,
      spentAt,
      title,
      amount,
      category,
      note,
    } = body;

    const newExpenses = {
      id: Math.random(),
      userId,
      spentAt,
      title,
      amount,
      category,
      note,
    };

    expenses.push(newExpenses);

    return newExpenses;
  },

  remove(expensesId) {
    expenses = expenses.filter(expense => expense.id !== +expensesId);
  },

  update(expensesId, body) {
    const foundExpense = expenses.find(expense => expense.id === +expensesId);

    Object.assign(foundExpense, body);

    return foundExpense;
  },

};

module.exports = { expenseService };
