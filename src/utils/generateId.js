'use strict';

const getNewId = (data) => (
  Math.max(
    ...data.map(user => user.id), 0
  ) + 1
);

module.exports = { getNewId };
