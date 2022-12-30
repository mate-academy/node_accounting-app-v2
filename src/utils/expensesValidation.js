'use strict';

const validation = (data) => {
  for (const key in data) {
    if (data[key].length === 0) {
      return true;
    }

    if ((key === 'amount'
      || key === 'userId')
      && typeof data[key] !== 'number') {
      return true;
    }

    if ((key === 'spentAt'
      || key === 'title'
      || key === 'category'
      || key === 'note')
      && typeof data[key] !== 'string') {
      return true;
    }
  }

  return false;
};

module.exports = {
  validation,
};
