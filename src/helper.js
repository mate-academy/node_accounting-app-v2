'use strict';

const getId = (expenses) =>
  expenses.reduce((acc, item) => {
    return acc > item.id ? acc : item.id;
  }, 0) + 1;

const isExpense = (
  userId,
  spentAt,
  title,
  amount,
  category,
) => {
  if (typeof userId !== 'number'
    && typeof spentAt !== 'string'
    && typeof title !== 'string'
    && typeof amount !== 'number'
    && typeof category !== 'string'
  ) {
    return true;
  }
};

const toNumber = (param) => {
  if (param == null) {
    return param;
  }

  const numberValue = Number(param);

  if (Number.isNaN(numberValue)) {
    throw new Error(`Incorrect number: ${param}`);
  }

  return numberValue;
};

const toDate = (param) => {
  if (param == null) {
    return param;
  }

  const dateValue = new Date(param);

  if (!(dateValue instanceof Date) || isNaN(dateValue)) {
    throw new Error(`Incorrect date: ${param}`);
  }

  return dateValue;
};

module.exports = {
  getId,
  isExpense,
  toNumber,
  toDate,
};
