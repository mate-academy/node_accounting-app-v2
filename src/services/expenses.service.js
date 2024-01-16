'use strict';

const { getNewId } = require('./../utils/getNewId');
const { getById: getUserById } = require('./users.service');

let expenses = [];

const get = ({ userId, categories, from, to }) => {
  if (!userId && !categories && !from && !to) {
    return expenses;
  }

  const preparedExpenses = expenses.filter(expense => {
    const timeSpentAt = new Date(expense.spentAt).getTime();

    const timeFrom = (from)
      ? new Date(from).getTime()
      : timeSpentAt;
    const timeTo = (to)
      ? new Date(to).getTime()
      : timeSpentAt;

    const isUserIdMatches = userId
      ? expense.userId === +userId
      : true;
    const isCategoryMatches = categories
      ? categories.includes(expense.category)
      : true;
    const isTimeStampMatches = ((timeSpentAt >= timeFrom)
    && (timeSpentAt <= timeTo));

    return (isUserIdMatches && isCategoryMatches && isTimeStampMatches);
  });

  return preparedExpenses;
};

const getById = (id) => {
  return expenses.find(expense => expense.id === id);
};

const create = (items) => {
  const newExpense = {
    id: getNewId(expenses),
    ...items,
  };

  expenses.push(newExpense);

  return newExpense;
};

const validateOnCreate = (items) => {
  const {
    userId,
    spentAt,
    title,
    amount,
    category,
    note,
  } = items;

  const arePropsValid = (
    (typeof userId === 'number' && getUserById(userId))
    && !isNaN(new Date(spentAt))
    && (typeof title === 'string' && title)
    && typeof amount === 'number'
    && (typeof category === 'string' && category)
    && (typeof note === 'string' || typeof note === 'undefined')
  );

  const validatedProps = {
    userId,
    spentAt,
    title,
    amount,
    category,
    note: note || '',
  };

  return [arePropsValid, validatedProps];
};

const remove = (id) => {
  expenses = expenses.filter(expense => expense.id !== id);
};

const update = (id, items) => {
  const expenseToUpdate = getById(id);

  const updatedExpense = {
    ...expenseToUpdate,
    ...items,
  };

  const index = expenses.indexOf(expenseToUpdate);

  expenses[index] = updatedExpense;

  return updatedExpense;
};

const validateOnUpdate = (items) => {
  const {
    spentAt,
    title,
    amount,
    category,
    note,
  } = items;

  const arePropsValid = (
    (!isNaN(new Date(spentAt)) || typeof spentAt === 'undefined')
    && ((typeof title === 'string' && title)
      || typeof title === 'undefined')
    && (typeof amount === 'number'
      || typeof amount === 'undefined')
    && ((typeof category === 'string' && category)
      || typeof category === 'undefined')
    && (typeof note === 'string'
      || typeof note === 'undefined')
  );

  const validatedItems = {
    spentAt,
    title,
    amount,
    category,
    note,
  };

  Object.keys(validatedItems).forEach(key => {
    if (validatedItems[key] === undefined) {
      delete validatedItems[key];
    }
  });

  return [arePropsValid, validatedItems];
};

const clear = () => {
  expenses = [];
};

module.exports = {
  get,
  getById,
  create,
  remove,
  update,
  validateOnCreate,
  validateOnUpdate,
  clear,
};
