'use strict';

const getIntegerId = (data) => {
  return data.length
    ? Math.max(...data.map(item => item.id)) + 1
    : 0;
};

module.exports = { getIntegerId };
