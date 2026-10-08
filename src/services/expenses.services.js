let expenses = [];

const getAll = ({ userId, categories, from, to } = {}) => {
  let result = expenses;

  if (userId !== undefined) {
    result = result.filter((expense) => expense.userId === userId);
  }

  if (categories !== undefined) {
    result = result.filter((expense) => categories.includes(expense.category));
  }

  if (from !== undefined) {
    result = result.filter((expense) => new Date(expense.spentAt) >= from);
  }

  if (to !== undefined) {
    result = result.filter((expense) => new Date(expense.spentAt) <= to);
  }

  return result;
};

const getExpense = (id) => {
  return expenses.find((expense) => expense.id === Number(id)) || null;
};

const create = (userId, spentAt, title, amount, category, note) => {
  const expense = {
    id: Date.now(),
    userId: userId,
    spentAt: spentAt,
    title: title,
    amount: amount,
    category: category,
    note: note,
  };

  expenses.push(expense);

  return expense;
};

const update = (id, spentAt, title, amount, category, note) => {
  const expense = getExpense(id);

  if (spentAt !== undefined) {
    expense.spentAt = spentAt;
  }

  if (title !== undefined) {
    expense.title = title;
  }

  if (amount !== undefined) {
    expense.amount = amount;
  }

  if (category !== undefined) {
    expense.category = category;
  }

  if (note !== undefined) {
    expense.note = note;
  }

  return expense;
};
const remove = (id) => {
  const filteredExpenses = expenses.filter((expense) => expense.id !== id);

  expenses = filteredExpenses;
};

function resetExpenses() {
  expenses = [];
}

module.exports = {
  getAll,
  getExpense,
  create,
  update,
  remove,
  resetExpenses,
};
