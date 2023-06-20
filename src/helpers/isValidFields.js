'use strict';

const { isDateValid } = require('./isDateValid');

const isValidFields = (record, value) => {
  switch (record) {
    case 'title':
    case 'category':
    case 'note':
      return typeof value === 'string';

    case 'amount':
    case 'userId':
      return typeof value === 'number';

    case 'spentAt':
    case 'from':
    case 'to':
      return isDateValid(value);

    default:
      throw new Error('no case');
  }
};

module.exports = {
  isValidFields,
};
