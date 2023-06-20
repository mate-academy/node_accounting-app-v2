'use strict';

function isDateValid(dateString) {
  const date = new Date(dateString);

  return !isNaN(date);
}

module.exports = {
  isDateValid,
};
