'use strict';

class Store {
  constructor() {
    this.users = [];

    this.expenses = [];
  }

  clearUsers() {
    this.users = [];
  }

  getAllUsers() {
    return this.users.length > 0 ? this.users : [];
  }

  getUser(userId) {
    const findUser = this.users.find(user => user.id === +userId);

    return findUser;
  }

  deleteUser(userId) {
    this.users = this.users.filter(user => user.id !== +userId);
  }

  createUser(name) {
    const newUser = {
      id: this.users.length + 1,
      name: name,
    };

    this.users.push(newUser);

    return newUser;
  }

  patchUser(userId, userName) {
    const user = this.getUser(userId);

    user.name = userName;

    return user;
  }

  clearExpenses() {
    this.expenses = [];
  }

  postExpenses(expenseData) {
    const newExpense = {
      id: this.expenses.length + 1,
      ...expenseData,
    };

    this.expenses = [...this.expenses, newExpense];

    return newExpense;
  }

  getAllExpenses(userId, categories, from, to) {
    let expenses = this.expenses;

    if (userId) {
      expenses = expenses.filter(expense => expense.userId === +userId);
    }

    if (categories) {
      expenses = expenses
        .filter(expense => categories.includes(expense.category));
    }

    if (from && to) {
      const fromDate = new Date(from);
      const toDate = new Date(to);

      expenses = expenses.filter(expense => {
        const expenseDate = new Date(expense.spentAt);

        return expenseDate >= fromDate && expenseDate <= toDate;
      });
    }

    return expenses.length > 0 ? expenses : [];
  }

  getExpenses(id) {
    return this.expenses.find(expense => expense.id === +id);
  }

  deleteExpenses(id) {
    this.expenses = this.expenses.filter(expense => expense.userId !== +id);
  }

  patchExpenses(id, spentAt, title, amount, category, note) {
    const expenseIndex = this.expenses.findIndex(expense => expense.id === +id);

    this.expenses[expenseIndex] = {
      ...this.expenses[expenseIndex],
      spentAt: spentAt || this.expenses[expenseIndex].spentAt,
      title: title || this.expenses[expenseIndex].title,
      amount: amount || this.expenses[expenseIndex].amount,
      category: category || this.expenses[expenseIndex].category,
      note: note || this.expenses[expenseIndex].note,
    };

    return this.expenses[expenseIndex];
  }
}

const myStore = new Store();

module.exports = {
  Store,
  myStore,
};
