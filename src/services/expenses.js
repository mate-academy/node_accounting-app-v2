'use strict';

const Services = require('../services/Services');

class ExpenseServices extends Services {
  create(body) {
    const newExpense = {
      ...body,
      id: this.newItemId++,
    };

    if (!body.title) {
      return null;
    }

    this.arrOfItems.push(newExpense);

    return newExpense;
  }
}

const expensesServices = new ExpenseServices();

module.exports = expensesServices;
