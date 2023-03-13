'use strict';

const getNewId = (data) => {
  return Math.max(0, ...data.map(value => value.id)) + 1;
};

module.exports = { getNewId };
