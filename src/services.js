'use strict';

const { isEmpty } = require('lodash');
const checkParams = require('./utils/checkParams');

const db = {
  expenses: [],
  users: [],
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
    return db[collection].find(entry => entry.id === id) || null;
  },

  create: (collection, item) => {
    db[collection].push(item);

    return item;
  },

  remove: (collection, id) => {
    const arr = db[collection];
    const i = arr.findIndex(entry => entry.id === id);

    arr.splice(i, 1);
  },

  patch: (collection, id, data) => {
    const arr = db[collection];
    const i = arr.findIndex(entry => entry.id === id);

    arr[i] = Object.assign(arr[i], data);

    return arr[i];
  },
};
