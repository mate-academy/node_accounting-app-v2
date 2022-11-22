'use strict';

const { getUserById } = require('../services/users');

const isValidData = (data) => {
  const {
    userId,
    spentAt,
    title,
    amount,
    category,
    note,
  } = data;

  const foundUser = getUserById(userId);

  if (
    !foundUser
    || typeof spentAt !== 'string'
    || typeof title !== 'string'
    || typeof category !== 'string'
    || typeof note !== 'string'
    || !spentAt.length
    || !title.length
    || !category.length
    || !note.length
    || typeof amount !== 'number'
  ) {
    return false;
  }

  return true;
};

module.exports = { isValidData };
