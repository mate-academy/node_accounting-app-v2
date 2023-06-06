'use strict';

function getMaxId(array) {
  const id = array.length
    ? Number(Math.max(...array.map((expens) => expens.id)) + 1)
    : 1;

  return id;
}

module.exports = { getMaxId };
