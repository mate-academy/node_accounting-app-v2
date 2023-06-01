'use strict';

const createId = (data) => {
  return Math.max(...data.map(element => element.id), 0) + 1;
};

module.exports = {
  createId,
};
