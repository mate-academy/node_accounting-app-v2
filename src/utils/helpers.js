'use strict';

function getMaxId(array) {
  const id = array.length
    ? Number(Math.max(...array.map((expense) => expense.id)) + 1)
    : 1;

  return id;
}

const handleDate = (spentAt, from, to) => {
  return {
    expenseDate: new Date(spentAt),
    fromDate: new Date(from),
    toDate: new Date(to),
  };
};

module.exports = {
  getMaxId,
  handleDate,
};
