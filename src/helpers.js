'use strict';

function findById(items, id) {
  return items.find((item) => item.id === Number(id));
}

function findIndexById(items, id) {
  return items.findIndex((item) => item.id === Number(id));
}

module.exports = { findById, findIndexById };
