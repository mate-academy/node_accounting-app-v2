'use strict';

const filterByQuery = (params, items) => {
  const { userId, from, to, categories } = params;

  return items.filter(exp => {
    const userIdCondition = !userId || exp.userId === +userId;
    const categoriesCondition = !categories || exp.category === categories;
    const dateCondition = !from
      || !to
      || (exp.spentAt > from && exp.spentAt < to);

    return userIdCondition && categoriesCondition && dateCondition;
  });
};

module.exports = {
  filterByQuery,
};
