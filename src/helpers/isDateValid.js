'use strict';

function isDateValid(dateString) {
  const date = new Date(dateString);

  return Number.isFinite(date);
}

module.exports = {
  isDateValid,
};
