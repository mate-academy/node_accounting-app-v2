'use strict';

const { isArray } = require('lodash');

module.exports = (params) => (expense) => {
  const date = new Date(expense.spentAt).getTime();
  const from = new Date(params.from).getTime();
  const to = new Date(params.to).getTime();

  const hasCategory = isArray(params.category)
    ? params.category.includes(expense.category)
    : params.category === expense.category;

  return Object.keys(params).every(key => {
    switch (key) {
      case 'from':
        return date >= from;
      case 'to':
        return date <= to;
      case 'category':
        return hasCategory;
      default:
        return expense[key] === params[key];
    }
  });
};
