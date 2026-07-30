const { generateAnyIdNumber } = require('../../helpers');


let expenses = [];

function reset() {
  expenses = [];
}

function getAll(filters = {}) {
  let result = [...expenses];

  if (filters.userId) {
    result = result.filter((exp) => exp.userId === Number(filters.userId));
  }

  if (filters.from) {
    const fromDate = new Date(filters.from);

    result = result.filter((exp) => new Date(exp.spentAt) >= fromDate);
  }

  if (filters.to) {
    const toDate = new Date(filters.to);

    result = result.filter((exp) => new Date(exp.spentAt) <= toDate);
  }

  if (filters.categories) {
    const categoryList = Array.isArray(filters.categories)
      ? filters.categories
      : filters.categories.split(',');

    result = result.filter((exp) => categoryList.includes(exp.category));
  }

  return result;
}

function getById(id) {
  return expenses.find((expense) => expense.id === Number(id));
}

function create({ userId, spentAt, title, amount, category, note }) {
  const expense = {
    id: generateAnyIdNumber(),
    userId: Number(userId),
    spentAt,
    title,
    amount,
    category,
    note,
  };

  expenses.push(expense);

  return expense;
}

function deleteById(id) {
  const index = expenses.findIndex((exp) => exp.id === Number(id));

  if (index === -1) {
    return null;
  }

  const [expense] = expenses.splice(index, 1);

  return expense;
}

function update(id, updates) {
  const expense = getById(id);

  if (!expense) {
    return null;
  }

  Object.keys(updates).forEach((key) => {
    if (updates[key] !== undefined) {
      if (key === 'userId') {
        expense.userId = Number(updates.userId);
      } else {
        expense[key] = updates[key];
      }
    }
  });

  return expense;
}

module.exports = {
  reset,
  getAll,
  getById,
  create,
  deleteById,
  update,
};
