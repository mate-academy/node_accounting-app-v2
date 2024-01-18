'use strict';

const { getNewId } = require('../helpers/getNewId');
const { getById: getUserById } = require('./user.serveces');

let expenses = [];

const getAll = () => expenses;

const getSome = ({ userId, categories, from, to }) => {
  return expenses.filter(expense => {
    const isUserIdValid = !userId || expense.userId === +userId;
    const areCategoriesValid = !categories || categories.includes(
      expense.category
    );
    const isFromValid = !from || new Date(from) <= new Date(expense.spentAt);
    const isToValid = !to || new Date(to) >= new Date(expense.spentAt);

    return isUserIdValid && areCategoriesValid && isFromValid && isToValid;
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

const reset = () => {
  expenses = [];
};

const isValidCreateBody = ({ userId, spentAt, title, amount, category }) => {
  const userIdValid = userId && !isNaN(+userId) && getUserById(+userId);
  const spentAtValid = spentAt && !isNaN(new Date(spentAt).getTime());
  const titleValid = title && typeof title === 'string';
  const amountValid = amount && !isNaN(+amount);
  const categoryValid = category && typeof category === 'string';

  return userIdValid
    && spentAtValid
    && titleValid
    && amountValid
    && categoryValid;
};

const isValidUpdateBody = ({ spentAt, title, amount, category, note }) => {
  const spentAtValid = typeof spentAt === 'undefined'
    || !isNaN(new Date(spentAt).getTime());
  const titleValid = typeof title === 'undefined' || typeof title === 'string';
  const amountValid = typeof amount === 'undefined' || !isNaN(+amount);
  const categoryValid = typeof category === 'undefined'
    || typeof category === 'string';
  const noteValid = typeof note === 'undefined' || typeof note === 'string';

  return spentAtValid
    && titleValid
    && amountValid
    && categoryValid
    && noteValid;
};

module.exports = {
  getAll,
  getSome,
  getById,
  create,
  remove,
  update,
  reset,
  isValidCreateBody,
  isValidUpdateBody,
};
