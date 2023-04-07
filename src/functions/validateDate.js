'use strict';

const isDateValid = (string) => {
  const date = new Date(string);
  const isDate = !isNaN(date.getTime());

  return isDate;
};

module.exports = { isDateValid };
