const { usersService } = require('./users/users.service');
const { expensesService } = require('./expenses/expenses.service');

function clearData() {
  usersService.clean();
  expensesService.clean();
}

function filterExpensesWithQuery(query) {
  let expenses = expensesService.getAll();

  const { userId, categories, from, to } = query;

  if (userId) {
    expenses = expenses.filter((expense) => expense.userId === +userId);
  }

  if (categories) {
    const filterCategories = categories.split(',');

    expenses = expenses.filter((expense) => {
      return filterCategories.includes(expense.category);
    });
  }

  if (from) {
    expenses = expenses.filter(
      (expense) => new Date(expense.spentAt) >= new Date(from),
    );
  }

  if (to) {
    expenses = expenses.filter(
      (expense) => new Date(expense.spentAt) <= new Date(to),
    );
  }

  return expenses;
}

module.exports = {
  clearData,
  filterExpensesWithQuery,
};
