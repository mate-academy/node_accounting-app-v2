'use strict';

function createNumberId(ids) {
  if (!ids.length) {
    return 0;
  }

  return +Math.max(...ids) + 1;
};

module.exports = {
  createNumberId,
};
