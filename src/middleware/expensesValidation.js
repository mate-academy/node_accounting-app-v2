'use strict';

const { BadRequest } = require('http-errors');
const userService = require('../services/users');

const validateExpenses = (req, res, next) => {
  const { userId, title, amount, category, note } = req.body;
  const requiredFields = ['userId', 'spentAt', 'title', 'amount', 'category'];

  const errors = [];

  if ((!userId, !title, !amount, !category)) {
    requiredFields.forEach((field) => {
      if (!req.body[field]) {
        errors.push({
          message: `Field ${field} is required`,
        });
      }
    });
  } else if (
    typeof title !== 'string'
    || typeof category !== 'string'
    || typeof note !== 'string'
  ) {
    errors.push({
      message: 'Invalid type of title, category or note. Must be a string',
    });
  } else if (isNaN(amount) || amount <= 0) {
    errors.push({
      message: 'Invalid amount. Amount must be a number and greater than 0',
    });
  } else if (isNaN(userId) || !userService.getOne(userId)) {
    errors.push({
      message: 'Invalid user id (must be a number) or user does not exist',
    });
  }

  if (errors.length) {
    throw new BadRequest({ errors });
  }

  next();
};

module.exports = { validateExpenses };
