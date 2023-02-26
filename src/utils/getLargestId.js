'use strict';

const getLargestId = (collection) => {
  let largestId = 0;

  for (const item of collection) {
    if (item.id > largestId) {
      largestId = item.id;
    }
  }

  return largestId;
};

module.exports = { getLargestId };
