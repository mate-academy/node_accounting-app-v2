'use strict';

function getUniqId(data) {
  const idColection = [];

  if (data.length === 0) {
    return 1;
  }

  data.forEach(item => {
    idColection.push(item.id);
  });

  return Math.max(...idColection) + 1;
};

module.exports = getUniqId;
