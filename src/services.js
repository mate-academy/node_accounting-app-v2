'use strict';

const { isEmpty, isArray } = require('lodash');

const db = {
  expenses: [],
  users: [],
};

const checkParams = (params) => (expense) => {
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

module.exports = {
  getAll: (collection, params = {}) => {
    const arr = db[collection];

    if (arr === db.expenses && !isEmpty(params)) {
      return arr.filter(checkParams(params));
    }

    return arr;
  },

  getById: (collection, id) => {
    return db[collection].find(entry => entry.id === id);
  },

  post: (collection, item) => {
    db[collection].push(item);

    return item;
  },

  remove: (collection, id) => {
    const arr = db[collection];
    const i = arr.findIndex(entry => entry.id === id);

    if (i === -1) {
      return 404;
    }
    arr.splice(i, 1);

    return 204;
  },

  patch: (collection, id, data) => {
    const arr = db[collection];
    const i = arr.findIndex(entry => entry.id === id);

    if (arr[i]) {
      arr[i] = Object.assign(arr[i], data);
    }

    return arr[i];
  },
};
