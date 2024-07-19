const usersService = require('./services/users.service');

function isValid(data) {
  const { userId, spentAt, title, amount, category, note } = data;

  if (
    !userId ||
    !spentAt ||
    !title ||
    !amount ||
    !category ||
    !note ||
    usersService.filterUsersById(userId).length === 0
  ) {
    return false;
  }

  return true;
}

module.exports = {
  isValid,
};
