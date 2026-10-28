const expenses = [];

function resetExpenses() {
  expenses.length = 0;
}

function getAll({ userId, categories, from, to }) {
  let expenseArray = [...expenses];

  if (userId) {
    expenseArray = expenseArray.filter((item) => item.userId === userId);
  }

  if (categories) {
    expenseArray = expenseArray.filter(
      (item) => categories.includes(item.category),
      // eslint-disable-next-line function-paren-newline
    );
  }

  if (from && to) {
    expenseArray = expenseArray.filter((item) => {
      const date = new Date(item.spentAt);

      return date >= new Date(from) && date <= new Date(to);
    });
  }

  return expenseArray;
}

function getById(id) {
  return expenses.find((expense) => expense.id === id) ?? null;
}

function create(data) {
  const id = expenses.length
    ? Math.max(...expenses.map((item) => item.id)) + 1
    : 1;
  const expense = { id, ...data };

  expenses.push(expense);

  return expense;
}

function update(id, data) {
  const expense = expenses.find((item) => item.id === id);

  if (!expense) {
    return;
  }

  return Object.assign(expense, { ...data });
}

function deleteById(id) {
  const index = expenses.findIndex((item) => item.id === id);

  if (index === -1) {
    return;
  }

  const [expense] = expenses.splice(index, 1);

  return expense;
}

const expenseService = {
  getAll,
  getById,
  create,
  update,
  deleteById,
};

module.exports = {
  expenseService,
  resetExpenses,
};
