const usersService = require('../services/usersService');

function validateExpenseData(data) {
  const { userId, spentAt, title, amount, category } = data;
  const user = usersService.getById(userId);

  return (
    user &&
    spentAt &&
    typeof spentAt === 'string' &&
    title &&
    typeof title === 'string' &&
    amount &&
    typeof amount === 'number' &&
    category &&
    typeof category === 'string'
  );
}

module.exports = {
  validateExpenseData,
};
