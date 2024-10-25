const { generateId } = require('../utils/generateId');
// eslint-disable-next-line prefer-const
let expenses = [];

const reset = () => {
  expenses = [];
};

const getAll = (filterParams = {}) => {
  const filteringMethods = {
    userId: (userId, expense) => +userId === +expense.userId,
    from: (from, expense) => new Date(expense.spentAt) > new Date(from),
    to: (to, expense) => new Date(expense.spentAt) < new Date(to),
    categories: (category, expense) => category === expense.category,
    default: () => true,
  };

  return expenses.filter(
    (expense) =>
      Object.entries(filterParams).every(([key, value]) => {
        const method = filteringMethods[key] ?? filteringMethods.default;

        return method(value, expense);
      }),
    // eslint-disable-next-line function-paren-newline
  );
};

const getById = (id) => {
  return expenses.find((expense) => +expense.id === +id) || null;
};
const create = (userId, spentAt, title, amount, category, note) => {
  const expense = {
    id: generateId(expenses),
    userId,
    spentAt,
    title,
    amount,
    category,
    note,
  };

  expenses.push(expense);

  return expense;
};

const remove = (id) => {
  expenses = expenses.filter((entry) => +entry.id !== +id);
};

const update = (id, param = {}) => {
  const expense = getById(id);

  Object.assign(expense, param);

  return expense;
};

module.exports = {
  reset,
  getAll,
  getById,
  create,
  remove,
  update,
};
