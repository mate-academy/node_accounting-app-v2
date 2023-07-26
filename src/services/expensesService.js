'use strict';

const {
  getNewId,
  filterExpenses,
} = require('../helper');

let expenses = [];

const setInitialExpenses = () => {
  expenses = [];
};

class ExpenseService {
  getAll({
    userId,
    categories,
    from,
    to,
  }) {
    const filteredExpenses = filterExpenses(
      expenses,
      userId,
      categories,
      from,
      to,
    );

    return filteredExpenses;
  };
  getOne(expenseId) {
    return expenses.find(({ id }) => id === +expenseId) || null;
  };
  create({
    userId,
    spentAt,
    title,
    amount,
    category,
    note,
  }) {
    const newExpense = {
      id: getNewId(expenses),
      userId,
      spentAt,
      title,
      amount,
      category,
      note,
    };

    expenses.push(newExpense);

    return newExpense;
  };
  remove(expenseId) {
    expenses = expenses.filter(({ id }) => +id !== +expenseId
    );
  };
  update(expenseId, newData) {
    const expenseToUpdate = this.getOne(+expenseId);

    Object.assign(expenseToUpdate, newData);

    return expenseToUpdate;
  };
}

module.exports = {
  setInitialExpenses,
  ExpenseService,
};
