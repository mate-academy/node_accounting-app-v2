'use strict';

const { getNewId } = require('./../helpers/getNewId');
const { getById: getUserById } = require('./user.service');

let expenses = [];

const getAll = () => {
  return expenses;
};

const getSome = ({ userId, categories, from, to }) => {
  return expenses.filter(expense => {
    if (userId && expense.userId !== +userId) {
      return false;
    }

    if (categories && !categories.includes(expense.category)) {
      return false;
    }

    if (from && new Date(from) > new Date(expense.spentAt)) {
      return false;
    }

    if (to && new Date(to) < new Date(expense.spentAt)) {
      return false;
    }

    return true;
  });
};

const getById = (id) => {
  return expenses.find(expense => expense.id === id);
};

const create = (body) => {
  const newExpense = {
    id: getNewId(expenses),
    ...body,
  };

  expenses.push(newExpense);

  return newExpense;
};

const remove = (id) => {
  expenses = expenses.filter(expense => expense.id !== id);
};

const update = (id, body) => {
  const expenseToUpdate = getById(id);
  const updatedExpense = {
    ...expenseToUpdate,
    ...body,
  };

  expenses.splice(expenses.indexOf(expenseToUpdate), 1, updatedExpense);

  return updatedExpense;
};

const clear = () => {
  expenses = [];
};

const isValidCreateBody = (body) => {
  const {
    userId,
    spentAt,
    title,
    amount,
    category,
  } = body;

  const isUserIdValid = userId && !isNaN(+userId) && getUserById(+userId);
  const isSpentAtValid = spentAt && !isNaN(new Date(spentAt).getTime());
  const isTitleValid = title && typeof title === 'string';
  const isAmountValid = amount && !isNaN(+amount);
  const isCategoryValid = category && typeof category === 'string';

  return isUserIdValid
    && isSpentAtValid
    && isTitleValid
    && isAmountValid
    && isCategoryValid;
};

const isValidUpdateBody = (body) => {
  const {
    spentAt,
    title,
    amount,
    category,
    note,
  } = body;

  const isSpentAtValid = typeof spentAt === 'undefined'
    || !isNaN(new Date(spentAt).getTime());

  const isTitleValid = typeof title === 'undefined'
    || typeof title === 'string';

  const isAmountValid = typeof amount === 'undefined' || !isNaN(+amount);

  const isCategoryValid = typeof category === 'undefined'
    || typeof category === 'string';

  const isNoteValid = typeof note === 'undefined' || typeof note === 'string';

  return isSpentAtValid
    && isTitleValid
    && isAmountValid
    && isCategoryValid
    && isNoteValid;
};

module.exports = {
  getAll,
  getSome,
  getById,
  create,
  remove,
  update,
  clear,
  isValidCreateBody,
  isValidUpdateBody,
};
