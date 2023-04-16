'use strict';

const usersServices = require('../services/users');

const validateData = (request) => {
  const requiredFields = ['userId', 'spentAt', 'title', 'amount', 'category'];

  const requestFields = Object.keys(request);

  const hasRequiredFields
    = requiredFields.every(field => requestFields.includes(field));

  const user = usersServices.getById(request.userId);

  if (!user || !hasRequiredFields || !requestFields.length) {
    return false;
  }

  const {
    userId,
    title,
    amount,
    category,
    spentAt,
    note,
  } = request;

  if (
    typeof userId !== 'number'
    || typeof amount !== 'number'
    || typeof title !== 'string'
    || typeof note !== 'string'
    || typeof category !== 'string'
    || isNaN(Date.parse(spentAt))
  ) {
    return false;
  }

  return true;
};

module.exports = validateData;
