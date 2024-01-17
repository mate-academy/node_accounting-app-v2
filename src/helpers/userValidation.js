'use strict';

const getMaxId = (users) => users.length > 0
  ? Math.max(...users.map(user => user.id))
  : 0;

const validate = (name) => {
  return typeof name === 'string';
};

module.exports = {
  getMaxId,
  validate,
};
