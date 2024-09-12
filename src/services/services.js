'use strict';

const getNewId = (data) => {
  return (data.sort((a, b) => b.id - a.id)[0] + 1) || 1;
};

module.exports = { getNewId };
