'use strict';

const { isDateInBoundaries, createId } = require('../helpers');
const { usersService } = require('../users/users.service');

let expenses = [];

function setInitialExpenses() {
  expenses = [];
}

const expensesService = {
  isExpenseValid(expense) {
    const requiredFields = [
      'userId',
      'spentAt',
      'title',
      'amount',
      'category',
      'note',
    ];

    const expenseKeys = Object.keys(expense);

    const hasRequiredFields = requiredFields.length === expenseKeys.length
      ? requiredFields.every(field => expenseKeys.includes(field))
      : false;

    const hasValidFields = hasRequiredFields
      ? expenseKeys.every(field => {
        if (field === 'spentAt') {
          return !isNaN(Date.parse(expense.spentAt));
        }

        const isFieldTypeNUmber = field === 'userId' || field === 'amount';

        return isFieldTypeNUmber
          ? typeof expense[field] === 'number'
          : typeof expense[field] === 'string';
      })
      : false;

    const hasUser = usersService.getById(expense.userId);

    return hasValidFields && hasUser;
  },
  isUpdateValid(query) {
    const possibleFields = [
      'spentAt',
      'title',
      'amount',
      'category',
      'note',
    ];

    const queryKeys = Object.keys(query);

    const hasValidFields = queryKeys.every(field => {
      if (!possibleFields.includes(field)) {
        return false;
      }

      if (field === 'spentAt') {
        return !isNaN(Date.parse(query.spentAt));
      }

      return field === 'amount'
        ? typeof query[field] === 'number'
        : typeof query[field] === 'string';
    });

    return hasValidFields;
  },
  getAll(query) {
    if (query) {
      const { userId, categories, from, to } = query;

      return expenses.filter(expense => {
        const isChosenUserId = userId
          ? Number(userId) === expense.userId
          : true;

        const isChosenCategory = categories
          ? categories.includes(expense.category)
          : true;

        const isChosenDate = from || to
          ? isDateInBoundaries(expense.spentAt, from, to)
          : true;

        return isChosenUserId && isChosenCategory && isChosenDate;
      });
    }

    return expenses;
  },
  getById(expenseId) {
    const foundExpense = expenses.find(expense => expense.id === expenseId);

    return foundExpense || null;
  },
  create(expense) {
    expense.id = createId();

    expenses.push(expense);

    return expense;
  },
  update(expenseId, query) {
    const foundExpense = expenses.find(expense => expense.id === expenseId);

    for (const key in query) {
      foundExpense[key] = query[key];
    }

    return foundExpense;
  },
  delete(expenseId) {
    expenses = expenses.filter(expense => expense.id !== expenseId);
  },
};

module.exports = {
  expensesService,
  setInitialExpenses,
};
