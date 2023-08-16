'use strict';

const generateId = (arr) => {
  if (arr.length === 0) {
    return 1;
  }

  const ids = arr.map((item) => item.id);
  const maxId = Math.max(...ids);

  return maxId + 1;
};

module.exports = { generateId };
