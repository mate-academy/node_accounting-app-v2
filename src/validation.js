const usersService = require('./services/users');

function isValidDate(date) {
  return date instanceof Date && !isNaN(date);
}

function isValidExpenseData(expenseData) {
  const { userId, spentAt, title, amount, category } = expenseData;

  if (!usersService.getById(userId)) {
    throw new Error('User not found');
  }

  if (!spentAt || !title || !amount || !category) {
    throw new Error('Missing required fields');
  }

  return true;
}

module.exports = {
  isValidDate,
  isValidExpenseData,
};
