let expenses = [];

function getAll() {
  return expenses;
}

function getById(id) {
  return expenses.find((expense) => expense.id === id) || null;
}

function create(expenseData) {
  const expense = { id: generateId(), ...expenseData };

  expenses.push(expense);

  return expense;
}

function deleteById(id) {
  if (!getById(id)) {
    return;
  }

  expenses = expenses.filter((expense) => expense.id !== id);
}

function update(expenseData) {
  const expense = getById(expenseData.id);

  Object.assign(
    expense,
    Object.fromEntries(
      Object.entries(expenseData).filter(([_, value]) => value !== undefined),
    ),
  );

  return expense;
}

function generateId() {
  if (expenses.length) {
    return Math.max(...expenses.map((user) => user.id)) + 1;
  }

  return 1;
}

function clean() {
  expenses = [];
}

module.exports = {
  expensesService: {
    getAll,
    getById,
    create,
    deleteById,
    update,
    clean,
  },
};
