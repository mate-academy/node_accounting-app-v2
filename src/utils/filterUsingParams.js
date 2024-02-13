'use strict';

const filterUsingParams = (arr, params) => {
  const { userId, categories, from, to } = params;

  return [...arr].filter((expense) => {
    const userIdFilter = userId
      ? expense.userId === +userId
      : true;
    const categoriesFilter = categories && categories.length > 0
      ? categories.includes(expense.category)
      : true;
    const fromFilter = from
      ? new Date(expense.spentAt) > new Date(from)
      : true;
    const toFilter = to
      ? new Date(expense.spentAt) < new Date(to)
      : true;

    return userIdFilter && categoriesFilter && fromFilter && toFilter;
  });
};

module.exports = {
  filterUsingParams,
};
