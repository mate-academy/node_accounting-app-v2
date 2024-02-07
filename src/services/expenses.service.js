'use strict';

const { createNumberId } = require('../helpers/createNumberId');

class ExpensesService {
  constructor() {
    this.__expenses = [];
  };

  get(queryParams) {
    const { userId, categories, from, to } = queryParams;
    let filteredExps = [...this.__expenses];

    if (userId) {
      filteredExps = filteredExps.filter(exp => exp.userId === +userId);
    }

    if (categories) {
      filteredExps = filteredExps.filter(exp => exp.category === categories);
    }

    if (from) {
      filteredExps = filteredExps.filter(exp => {
        const expenseDate = new Date(exp.spentAt);
        const fromDate = new Date(from);

        return expenseDate >= fromDate;
      });
    }

    if (to) {
      filteredExps = filteredExps.filter(exp => {
        const expenseDate = new Date(exp.spentAt);
        const toDate = new Date(to);

        return expenseDate <= toDate;
      });
    }

    return filteredExps;
  };

  getOne(id) {
    const numId = +id;

    return this.__expenses.find(exp => exp.id === numId) || null;
  };

  create(params) {
    const newExpense = {
      id: createNumberId(this.__getExpensesIds()),
      ...params,
    };

    this.__expenses.push(newExpense);

    return newExpense;
  };

  remove(id) {
    const numId = +id;

    this.__expenses = this.__expenses.filter(expense => expense.id !== numId);
  };

  update(id, params) {
    const numId = +id;
    const oldExpense = this.getOne(numId);
    const newExpense = {
      ...oldExpense,
      ...params,
      id: numId,
    };

    this.remove(numId);

    this.__expenses.push(newExpense);

    return newExpense;
  };

  isValidParamsFor(action, params) {
    const paramsFields = Object.keys(params);
    const requiredFields = this.__getRequiredFields(action);

    return paramsFields.every(field => requiredFields.includes(field));
  };

  __getRequiredFields(action) {
    switch (action) {
      case 'update':
        return ['spentAt', 'title', 'amount', 'category', 'note'];

      case 'create':
        return ['userId', 'spentAt', 'title', 'amount', 'category', 'note'];

      default:
        return [];
    };
  };

  __getExpensesIds() {
    return this.__expenses.map(expense => expense.id);
  };

  __clear() {
    this.__expenses = [];
  };
};

const expensesService = new ExpensesService();

module.exports = {
  expensesService,
};
