let expenses = [];

function start() {
  expenses = [];
}

function getAll(userId, categories, from, to) {
  let filteredExpenses = [...expenses];

  if (userId) {
    filteredExpenses = filteredExpenses.filter((e) => e.userId === +userId);
  }

  if (categories) {
    filteredExpenses = filteredExpenses.filter(
      (e) => e.category === categories,
    );
  }

  if (from) {
    filteredExpenses = filteredExpenses.filter((e) => e.spentAt >= from);
  }

  if (to) {
    filteredExpenses = filteredExpenses.filter((e) => e.spentAt <= to);
  }

  return filteredExpenses;
}

function getById(expenseId) {
  return expenses.find((e) => e.id === +expenseId);
}

function create(userId, spentAt, title, amount, category, note) {
  const expense = {
    id: Math.floor(Math.random() * 1000000),
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

function deleteById(expenseId) {
  const index = expenses.findIndex((e) => e.id === +expenseId);

  if (index === -1) {
    return;
  }

  const [expense] = expenses.splice(index, 1);

  return expense;
}

function update({ id, ...data }) {
  const expense = expenses.find((e) => e.id === +id);

  if (!expense) {
    return;
  }

  Object.keys(data).forEach((key) => {
    if (data[key] !== undefined) {
      expense[key] = data[key];
    }
  });

  return expense;
}

module.exports = {
  start,
  getAll,
  getById,
  create,
  deleteById,
  update,
};
