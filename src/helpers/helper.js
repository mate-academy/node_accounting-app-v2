'use strict';

const maxId = (params) => {
  let max = -1;

  if (params.length === 0) {
    max = 1;

    return max;
  }

  for (const exp of params) {
    if (exp.id > max) {
      max = exp.id;
    }
  }
  max++;

  return max;
};

module.exports = {
  maxId,
};
