'use strict';

const getRandomId = (numberOfDigits) => {
  const NUMBER_LENGTH = 10;

  return Math.random().toString().slice(2, NUMBER_LENGTH + 2);
};

module.exports = {
  getRandomId,
};
