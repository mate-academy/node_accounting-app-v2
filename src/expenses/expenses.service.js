let expenses = [];
let uniqueId = 1;

function clearExpenses() {
  expenses = [];
}

function getAll({ userId: queryUserId, categories, to, from }) {
  let filteredExpenses = expenses;

  if (queryUserId) {
    filteredExpenses = filteredExpenses.filter(
      ({ userId }) => +queryUserId === userId,
    );
  }

  if (categories) {
    const categoriesArray =
      typeof categories === 'string' ? categories.split(',') : categories || [];
    const handleFilterByCategories = ({ category }) =>
      categoriesArray.includes(category);

    filteredExpenses = filteredExpenses.filter(handleFilterByCategories);
  }

  if (from) {
    filteredExpenses = filteredExpenses.filter(
      ({ spentAt }) => Date.parse(spentAt) > Date.parse(from),
    );
  }

  if (to) {
    filteredExpenses = filteredExpenses.filter(
      ({ spentAt }) => Date.parse(spentAt) < Date.parse(to),
    );
  }

  return filteredExpenses;
}

function getById(id) {
  return expenses.find((expense) => expense.id === id) || null;
}

function deleteById(id) {
  expenses = expenses.filter((expense) => expense.id !== id);
}

function create({ userId, spentAt, title, amount, category, note }) {
  const newExpense = {
    id: uniqueId,
    userId,
    spentAt,
    title,
    amount,
    category,
    note,
  };

  uniqueId += 1;

  expenses.push(newExpense);

  return newExpense;
}

function update(id, newValues) {
  const expenseToUpdate = getById(id);

  return Object.assign(expenseToUpdate, { ...newValues });
}

module.exports = {
  clearExpenses,
  getAll,
  getById,
  deleteById,
  create,
  update,
};
