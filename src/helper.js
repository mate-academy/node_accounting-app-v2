'use strict';

const getId = (expenses) =>
  expenses.reduce((acc, item) => {
    return acc > item.id ? acc : item.id;
  }, 0) + 1;

module.exports = {
  getId,
};
