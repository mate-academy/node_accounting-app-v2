const { getNewId } = require('../utils/getNewId');

const reqFields = [
  'id',
  'userId',
  'spentAt',
  'title',
  'amount',
  'category',
  'note',
];

const expenses = [];

const reset = () => {
  expenses.length = 0;
};

const getAll = ({ userId, categories, from, to }) => {
  let result = expenses;

  if (userId) {
    result = result.filter((item) => item.userId === +userId);
  }

  if (categories) {
    const categorySet = new Set(
      Array.isArray(categories) ? categories : [categories],
    );

    result = result.filter((item) => categorySet.has(item.category));
  }

  if (from || to) {
    const fromDate = from ? new Date(from) : null;
    const toDate = to ? new Date(to) : null;

    result = result.filter((item) => {
      const spentDate = new Date(item.spentAt);

      return (
        (!fromDate || spentDate >= fromDate) && (!toDate || spentDate <= toDate)
      );
    });
  }

  return result;
};

const getById = (id) => {
  return expenses.find((expense) => expense.id === +id) || null;
};

const update = (id, dataToUpdate) => {
  const expense = getById(id);

  if (!expense) {
    return null;
  }

  Object.assign(expense, dataToUpdate);

  return expense;
};

const remove = (id) => {
  const index = expenses.findIndex((expense) => expense.id === +id);

  if (index !== -1) {
    expenses.splice(index, 1);

    return true;
  }

  return false;
};

const create = (data) => {
  const newExpense = {
    id: getNewId(expenses),
    ...data,
  };

  expenses.push(newExpense);

  return newExpense;
};

module.exports = {
  getAll,
  getById,
  update,
  remove,
  create,
  reset,
  reqFields,
};
