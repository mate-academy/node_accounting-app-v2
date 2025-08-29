/* eslint-disable no-shadow */

let expenses = [];
let currentId = 1;

function getAll(query = {}) {
  return expenses.filter((expense) => {
    let matches = true;

    if (query.userId !== undefined) {
      matches = matches && expense.userId === Number(query.userId);
    }

    if (query.categories) {
      const cats = Array.isArray(query.categories)
        ? query.categories
        : [query.categories];

      matches =
        matches &&
        cats.some(
          (cat) => expense.category.toLowerCase() === cat.toLowerCase(),
        );
    }

    if (query.from) {
      matches = matches && new Date(expense.spentAt) >= new Date(query.from);
    }

    if (query.to) {
      matches = matches && new Date(expense.spentAt) <= new Date(query.to);
    }

    return matches;
  });
}

function getById(id) {
  return expenses.find((expense) => expense.id === id);
}

function create(title, userId, spentAt, amount, category, note) {
  const expense = {
    id: currentId++,
    title,
    userId,
    spentAt,
    amount,
    category,
    note,
  };

  expenses.push(expense);

  return expense;
}

function deleteById(id) {
  const index = expenses.findIndex((expense) => expense.id === id);

  if (index === -1) return;

  const [expense] = expenses.splice(index, 1);

  return expense;
}

function update({ id, title, userId, spentAt, amount, category, note }) {
  const expense = expenses.find((expense) => expense.id === id);

  if (!expense) return;

  return Object.assign(expense, {
    title: title ?? expense.title,
    userId: userId ?? expense.userId,
    spentAt: spentAt ?? expense.spentAt,
    amount: amount ?? expense.amount,
    category: category ?? expense.category,
    note: note ?? expense.note,
  });
}

function clear() {
  expenses = [];
  currentId = 1;
}

module.exports = {
  getAll,
  getById,
  create,
  deleteById,
  update,
  clear,
};
