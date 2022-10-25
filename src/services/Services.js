'use strict';

class Services {
  constructor() {
    this.newItemId = 1;
    this.arrOfItems = [];
  }

  getAll() {
    return this.arrOfItems;
  }

  getOne(id) {
    return this.arrOfItems
      .find(item => item.id === +id);
  }

  remove(id) {
    if (!this.getOne(id)) {
      return null;
    }

    const filteredExpenses = this.arrOfItems
      .filter(expense => expense.id !== +id);

    this.arrOfItems = filteredExpenses;

    return this.arrOfItems;
  }

  reset() {
    this.arrOfItems = [];
  }
};

module.exports = Services;
