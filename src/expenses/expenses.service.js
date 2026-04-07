const expenses = [];
let nextId = 1;

function clear() {
  expenses.length = 0;
  nextId = 1;
}

function getAll() {
  return expenses;
}

function getById(id) {
  return expenses.find((expense) => expense.id === Number(id));
}

function createExpense(userId, spentAt, title, amount, category, note) {
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
  const index = expenses.findIndex(
    (expenseToDelete) => expenseToDelete.id === Number(id),
  );

  if (index === -1) {
    return;
  }

  const [expense] = expenses.splice(index, 1);

  return expense;
}

function updateExpense({ id, ...fields }) {
  const expense = expenses.find(
    (expenseToUpdate) => expenseToUpdate.id === Number(id),
  );

  if (!expense) {
    return;
  }

  Object.keys(fields).forEach((key) => {
    if (fields[key] !== undefined) {
      expense[key] = fields[key];
    }
  });

  return expense;
}

module.exports = {
  getAll,
  getById,
  createExpense,
  deleteById,
  updateExpense,
  clear,
};
