'use strict';

function getId(list) {
  const idList = list.map(value => value.id);

  return Math.max(...idList) + 1;
}

module.exports.getId = getId;
