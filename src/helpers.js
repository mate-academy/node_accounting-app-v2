'use strict';

function createId() {
  return Number((Math.random() * 1000 * 1000 * 1000).toFixed());
}

function isDateInBoundaries(date, from, to) {
  const dateAsNumber = Number(new Date(date));
  const fromAsNumber = from ? Number(new Date(from)) : 0;
  const toAsNumber = to ? Number(new Date(to)) : 0;

  return dateAsNumber >= fromAsNumber && dateAsNumber <= toAsNumber;
}

module.exports = {
  createId,
  isDateInBoundaries,
};
