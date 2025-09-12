let expenses = [];

function getAll() {
  return expenses;
}

function get(expenseId) {
  return expenses.find((exp) => exp.id === expenseId);
}

function create(title, userId, spentAt, amount, category, note) {
  const newExpense = {
    id: Date.now(),
    userId,
    spentAt,
    title,
    amount,
    category,
    note,
  };

  expenses.push(newExpense);

  return newExpense;
}

function deleteById(expenseId) {
  const index = expenses.findIndex((exp) => exp.id === expenseId);

  if (index === -1) {
    return;
  }

  return expenses.splice(index, 1);
}

function update({ id, title, amount, category, note, spentAt }) {
  const thisExpense = expenses.find((exp) => exp.id === id);

  if (!thisExpense) {
    return;
  }

  const updates = {
    title,
    amount,
    category,
    note,
    spentAt,
  };

  for (const key in updates) {
    if (updates[key] !== undefined) {
      thisExpense[key] = updates[key];
    }
  }

  return thisExpense;
}

const resetExpenses = () => {
  expenses = [];
};

module.exports.expensesService = {
  getAll,
  get,
  create,
  deleteById,
  update,
  resetExpenses,
};
