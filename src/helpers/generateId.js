'use strict';

const generateId = (contentArray) => {
  if (contentArray.length < 1) {
    return 1;
  }

  const maxId = Math.max(...contentArray.map(expense => expense.id));

  return maxId + 1;
};

module.exports = { generateId };
