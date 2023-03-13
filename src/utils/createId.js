'use strict';

const createId = (array) => {
  const ids = array.map(({ id }) => id);

  return (Math.max(...ids, 0)) + 1;
};

module.exports = {
  createId,
};
