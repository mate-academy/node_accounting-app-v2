'use strict';

const UserService = require('./user.service');

let expenses = [];

module.exports = {
  getAll: (filters = {}) => {
    let filtered = [...expenses];

    if (filters.userId) {
      filtered = filtered.filter((e) => e.userId === Number(filters.userId));
    }

    if (filters.from && filters.to) {
      const fromDate = new Date(filters.from);
      const toDate = new Date(filters.to);

      filtered = filtered.filter((e) => {
        const expenseDate = new Date(e.spentAt);

        return expenseDate >= fromDate && expenseDate <= toDate;
      });
    }

    if (filters.categories) {
      const categoryList = filters.categories.split(',');

      filtered = filtered.filter((e) => categoryList.includes(e.category));
    }

    return filtered;
  },

  getById: (id) => {
    return expenses.find((e) => e.id === +id) || null;
  },

  create: (expenseData) => {
    const { userId, spentAt, title, amount, category, note } = expenseData;

    if (!title) {
      throw new Error('Title is required');
    }

    if (!category) {
      throw new Error('Category is required');
    }

    if (amount === undefined || amount === null) {
      throw new Error('Amount is required');
    }

    const numAmount = Number(amount);

    if (isNaN(numAmount)) {
      throw new Error('Amount must be a number');
    }

    if (!spentAt) {
      throw new Error('SpentAt is required');
    }

    const spentAtDate = new Date(spentAt);

    if (isNaN(spentAtDate.getTime())) {
      throw new Error('SpentAt must be a valid date');
    }

    if (userId === undefined || userId === null) {
      throw new Error('UserId is required');
    }

    const uid = Number(userId);

    if (isNaN(uid)) {
      throw new Error('UserId must be a number');
    }

    const user = UserService.getById(uid);

    if (!user) {
      throw new Error('User not found');
    }

    const maxId = expenses.reduce(
      (max, expense) => Math.max(max, expense.id),
      0,
    );
    const newId = maxId + 1;

    const newExpense = {
      id: newId,
      userId: uid,
      spentAt,
      title,
      amount: numAmount,
      category,
      note,
    };

    expenses.push(newExpense);

    return newExpense;
  },

  update: (id, updateData) => {
    const expense = expenses.find((e) => e.id === +id);

    if (!expense) {
      throw new Error('Expense not found');
    }

    const { userId, spentAt, title, amount, category, note } = updateData;

    if (userId !== undefined) {
      const uid = Number(userId);

      if (isNaN(uid)) {
        throw new Error('UserId must be a number');
      }

      const userExists = UserService.getById(uid);

      if (!userExists) {
        throw new Error('User not found');
      }
      expense.userId = uid;
    }

    if (spentAt !== undefined) {
      expense.spentAt = spentAt;
    }

    if (title !== undefined) {
      expense.title = title;
    }

    if (amount !== undefined) {
      expense.amount = +amount;
    }

    if (category !== undefined) {
      expense.category = category;
    }

    if (note !== undefined) {
      expense.note = note;
    }

    return expense;
  },

  delete: (id) => {
    const initialLength = expenses.length;

    expenses = expenses.filter((e) => e.id !== +id);

    if (expenses.length === initialLength) {
      throw new Error('Expense not found');
    }

    return true;
  },

  reset: () => {
    expenses = [];
  },
};
