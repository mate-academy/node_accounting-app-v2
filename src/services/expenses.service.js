const expenses = [];
let currentId = 0;

function getAll() {
  return expenses;
}

function getById(id) {
  return expenses.find((user) => user.id === id);
}

function create(userId, spentAt, title, amount, category, note) {
  const expense = {
    id: currentId + 1,
    userId,
    spentAt,
    title,
    amount,
    category,
    note,
  };

  currentId++;
  expenses.push(expense);

  return expense;
}

function deleteById(id) {
  const index = expenses.findIndex((expenseItem) => expenseItem.id === id);

  if (index === -1) {
    return;
  }

  const [expense] = expenses.splice(index, 1);

  return expense;
}

function update({ id, ...newData }) {
  const expense = expenses.find((e) => e.id === id);

  if (!expense) {
    return null;
  }

  Object.assign(expense, newData);

  return expense;
}

function clear() {
  expenses.length = 0;
  currentId = 0;
}

const expensesService = {
  getAll,
  getById,
  create,
  deleteById,
  update,
  clear,
};

module.exports = {
  expensesService,
};
