/* eslint-disable function-paren-newline */
let expenses = [];

let nextExpenseId = 1;

const setInitExpanses = () => {
  expenses = [];
};

const getAll = (filters = {}) => {
  let result = [...expenses];

  const { userId, from, to, categories } = filters;

  if (userId) {
    result = result.filter((expense) => expense.userId === Number(userId));
  }

  if (from) {
    result = result.filter(
      (expense) => new Date(expense.spentAt) >= new Date(from),
    );
  }

  if (to) {
    result = result.filter(
      (expense) => new Date(expense.spentAt) <= new Date(to),
    );
  }

  if (categories) {
    const categoryList = Array.isArray(categories) ? categories : [categories];

    result = result.filter((expense) =>
      categoryList.includes(expense.category),
    );
  }

  return result;
};

const getById = (id) => {
  const idNum = Number(id);

  return expenses.find((expense) => expense.id === idNum);
};

const create = ({ userId, spentAt, title, amount, category, note }) => {
  const expense = {
    id: nextExpenseId,
    userId,
    spentAt,
    title,
    amount,
    category,
    note,
  };

  expenses.push(expense);
  nextExpenseId++;

  return expense;
};

const remove = (id) => {
  const idNum = Number(id);

  const index = expenses.findIndex((expense) => expense.id === idNum);

  if (index === -1) {
    return;
  }

  const [removed] = expenses.splice(index, 1);

  return removed;
};

const update = ({ id, userId, spentAt, title, amount, category, note }) => {
  const idNum = Number(id);

  const updatedExpense = expenses.find((expense) => expense.id === idNum);

  if (!updatedExpense) {
    return;
  }

  return Object.assign(updatedExpense, {
    userId,
    spentAt,
    title,
    amount,
    category,
    note,
  });
};

module.exports = {
  getAll,
  getById,
  create,
  remove,
  update,
  setInitExpanses,
};
