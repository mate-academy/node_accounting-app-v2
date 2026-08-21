let expenses = [];
let nextId = 1;

function getAll({ userId, from, to, categories } = {}) {
  return expenses.filter((expense) => {
    if (userId !== undefined && expense.userId !== userId) {
      return false;
    }

    if (from && expense.spentAt < from) {
      return false;
    }

    if (to && expense.spentAt > to) {
      return false;
    }

    if (categories && !categories.includes(expense.category)) {
      return false;
    }

    return true;
  });
}

function getById(id) {
  return expenses.find((expense) => expense.id === id);
}

function create({ userId, spentAt, title, amount, category, note = '' }) {
  const expense = {
    id: nextId++,
    userId,
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
  const index = expenses.findIndex((item) => item.id === id);

  if (index === -1) {
    return;
  }

  const [expense] = expenses.splice(index, 1);

  return expense;
}

function update({ id, ...changes }) {
  const expense = expenses.find((item) => item.id === id);

  if (!expense) {
    return;
  }

  return Object.assign(expense, changes);
}

function reset() {
  expenses = [];
  nextId = 1;
}

const expensesService = {
  getAll,
  getById,
  create,
  deleteById,
  update,
  reset,
};

module.exports = { expensesService };
