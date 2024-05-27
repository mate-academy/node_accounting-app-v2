const STATUS_CODES = require('../constant/statusCode');
const userService = require('../services/user.service');

const validateExpense = (expense) => {
  const { userId, spentAt, title, amount, category } = expense;

  if (!userService.getById(userId)) {
    return { isValid: false, statusCode: STATUS_CODES.badRequest };
  }

  if (
    !spentAt ||
    !title ||
    typeof title !== 'string' ||
    !amount ||
    typeof amount !== 'number' ||
    !category ||
    typeof category !== 'string'
  ) {
    return { isValid: false, statusCode: STATUS_CODES.badRequest };
  }

  return { isValid: true };
};

module.exports = {
  validateExpense,
};
