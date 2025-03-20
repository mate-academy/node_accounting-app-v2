let expenses = [];

function emptyExpenses() {
  expenses = [];
}

function getExpenses(userId, from, to, categories) {
  let filterExpenses = [...expenses];

  if (userId) {
    filterExpenses = filterExpenses.filter((e) => e.userId === userId);
  }

  if (from && to) {
    const startDate = Date.parse(from);
    const endDate = Date.parse(to);

    filterExpenses = filterExpenses.filter(
      (e) =>
        Date.parse(e.spentAt) <= endDate && Date.parse(e.spentAt) >= startDate,
    );
  }

  if (categories) {
    filterExpenses = filterExpenses.filter((e) => {
      return categories.includes(e.category);
    });
  }

  return filterExpenses;
}

function getById(id) {
  const expense = expenses.find((u) => u.id === id);

  return expense;
}

function create({ userId, spentAt, title, amount, category, note }) {
  const id = expenses.length + 1;

  expenses.push({
    id,
    userId,
    spentAt,
    title,
    amount,
    category,
    note,
  });

  return {
    id,
    userId,
    spentAt,
    title,
    amount,
    category,
    note,
  };
}

function deleteById(id) {
  const index = expenses.findIndex((u) => u.id === id);

  if (index === -1) {
    return;
  }

  const [expense] = expenses.splice(index, 1);

  return expense;
}

function update({ id, spentAt, title, amount, category, note }) {
  const expense = getById(id);

  if (!expense) {
    return;
  }

  let updatedExpense = expense;

  if (spentAt !== undefined) {
    updatedExpense = Object.assign(updatedExpense, { spentAt });
  }

  if (title !== undefined) {
    updatedExpense = Object.assign(updatedExpense, { title });
  }

  if (amount !== undefined) {
    updatedExpense = Object.assign(updatedExpense, { amount });
  }

  if (category !== undefined) {
    updatedExpense = Object.assign(updatedExpense, { category });
  }

  if (note !== undefined) {
    updatedExpense = Object.assign(updatedExpense, { note });
  }

  return updatedExpense;
}

const expenseService = {
  emptyExpenses,
  getExpenses,
  getById,
  create,
  deleteById,
  update,
};

module.exports = expenseService;
