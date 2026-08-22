'use strict';

function createExpensesService(usersService) {
  const expenses = [];
  let lastId = 0;

  const getAll = ({ userId, categories, from, to } = {}) => {
    let result = expenses;

    if (userId) {
      result = result.filter((expense) => expense.userId === +userId);
    }

    if (categories) {
      const categoryList = Array.isArray(categories)
        ? categories
        : categories.split(',');

      result = result.filter(
        (expense) =>
          // eslint-disable-next-line
          categoryList.includes(expense.category),
        // eslint-disable-next-line
      );
    }

    if (from) {
      const fromDate = new Date(from);

      result = result.filter(
        (expense) => new Date(expense.spentAt) >= fromDate,
      );
    }

    if (to) {
      const toDate = new Date(to);

      result = result.filter((expense) => new Date(expense.spentAt) <= toDate);
    }

    return result;
  };

  const getById = (id) => expenses.find((expense) => expense.id === id);

  const userExists = (userId) => Boolean(usersService.getById(+userId));

  const create = ({ userId, spentAt, title, amount, category, note }) => {
    lastId += 1;

    const newExpense = {
      id: lastId,
      userId,
      spentAt,
      title,
      amount,
      category,
      note,
    };

    expenses.push(newExpense);

    return newExpense;
  };

  const update = (id, changes) => {
    const expense = getById(id);

    if (!expense) {
      return null;
    }

    Object.assign(expense, changes);

    return expense;
  };

  const remove = (id) => {
    const index = expenses.findIndex((expense) => expense.id === id);

    if (index === -1) {
      return null;
    }

    const [deletedExpense] = expenses.splice(index, 1);

    return deletedExpense;
  };

  return {
    getAll,
    getById,
    userExists,
    create,
    update,
    remove,
  };
}

module.exports = {
  createExpensesService,
};
