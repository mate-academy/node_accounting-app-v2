'use strict';

const getRandomId = (numberOfDigits) => {
  const NUMBER_LENGTH = 10;

  return +Math.random().toString().slice(2, NUMBER_LENGTH + 2);
};

const isEmpty = (value) => {
  return (value == null
    || (typeof value === 'string'
    && value.trim().length === 0));
};

const validateDate = (date) => {
  return new Date(date).toString() !== 'Invalid Date';
};

module.exports = {
  getRandomId,
  isEmpty,
  validateDate,
};
