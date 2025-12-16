/* eslint-disable function-paren-newline */
let expenses = [];

const get = () => {
  return expenses;
};

const getOne = (id) => {
  return expenses.find((expense) => expense.id === id);
};

const getByQuery = (query) => {
  let result = [...expenses];

  if (!query || Object.keys(query).length === 0) {
    return result;
  }

  const { userId, categories, from, to } = query;

  if (userId) {
    result = result.filter((expense) => expense.userId === +userId);
  }

  if (categories) {
    const categoryList = Array.isArray(categories)
      ? categories
      : categories.split(',');

    result = result.filter((expense) =>
      categoryList.includes(expense.category),
    );
  }

  if (from && to) {
    const fromDate = new Date(from);
    const toDate = new Date(to);

    result = result.filter((expense) => {
      const expenseData = new Date(expense.spentAt);

      return expenseData >= fromDate && expenseData <= toDate;
    });
  }

  return result;
};

const create = ({ userId, spentAt, title, amount, category, note }) => {
  const maxId =
    expenses.length > 0
      ? Math.max(...expenses.map((expense) => expense.id)) + 1
      : 0;

  const newExpense = {
    id: maxId,
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

const update = ({ id, ...updates }) => {
  const expense = expenses.find((e) => e.id === id);

  Object.assign(expense, updates);

  return expense;
};

const remove = (id) => {
  expenses = expenses.filter((expense) => expense.id !== id);
};

const clear = () => {
  expenses = [];
};

module.exports = {
  get,
  getOne,
  getByQuery,
  create,
  update,
  remove,
  clear,
};
