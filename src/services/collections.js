'use strict';

const collections = {
  users: [],
  expenses: [],
};

function getCollection() {
  return collections;
}

module.exports = {
  getCollection,
};
