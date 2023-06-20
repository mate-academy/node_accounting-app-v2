'use strict';

const { expensesId } = require('../helpers/getNextId');
const { isValidFields } = require('../helpers/isValidFields');

let expenses = [];

const create = (requireParams, note) => {
  for (const field in requireParams) {
    if (!isValidFields(field, requireParams[field])) {
      throw new Error('invalid fields');
    }
  }

  const newExpenses = {
    id: expensesId.getId(),
    ...requireParams,
    note: isValidFields('note', note) ? note : '',
  };

  expenses.push(newExpenses);

  return newExpenses;
};

const getById = (recordId) => {
  const foundedUser = expenses.find(item => item.id === recordId);

  return foundedUser || null;
};

const remove = (recordId) => {
  const foundedRecord = getById(recordId);

  if (!foundedRecord) {
    return false;
  }

  expenses = expenses.filter(user => user.id !== recordId);

  expensesId.addFreeId(recordId);

  return true;
};

const update = (recordId, params) => {
  const foundedRecord = getById(recordId);

  if (!foundedRecord) {
    return {
      status: false,
      statusCode: 404,
    };
  }

  const updateData = {};

  for (const data in params) {
    if (isValidFields(data, params[data])) {
      updateData[data] = params[data];
    }
  }

  if (!Object.keys(updateData).length) {
    return {
      status: false,
      statusCode: 400,
    };
  }

  Object.assign(foundedRecord, { ...updateData });

  return {
    status: true,
    statusCode: 201,
    record: foundedRecord,
  };
};

const getAll = ({
  userId,
  categories,
  from,
  to,
}) => {
  let filtredExpenses = [...expenses];

  if (!userId && isValidFields('userId', userId)) {
    filtredExpenses = expenses.filter(expense => expense.userId === userId);
  }

  if (Array.isArray(categories) && categories.length > 0) {
    filtredExpenses = expenses.filter(expense => (
      categories.includes(expense.category)
    ));
  }

  let fromDate = null;
  let toDate = null;

  if (from && isValidFields('from', from)) {
    fromDate = new Date(from);
  }

  if (to && isValidFields('to', to)) {
    toDate = new Date(to);
  }

  filtredExpenses = expenses.filter(expense => {
    const date = new Date(expense.spentAt);

    if (date < fromDate && date > toDate) {
      return false;
    }

    return true;
  });

  return filtredExpenses;
};

module.exports = {
  getAll,
  getById,
  create,
  remove,
  update,
};
