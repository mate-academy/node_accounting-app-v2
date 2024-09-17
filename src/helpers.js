'use strict';

const getNextId = (items) => {
  if (!items.length) {
    return 1;
  }

  return Math.max(...items.map(({ id }) => id)) + 1;
};

const isValidDate = (dateString) => {
  return !Number.isNaN(+new Date(dateString));
};

module.exports = {
  getNextId,
  isValidDate,
};
