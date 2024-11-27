const { getUserById } = require('./users.service');
const expenses = [];

function getAll() {
  return expenses;
}

function getExpenseByQuery(query) {
  const { to, from, userId, categories } = query;

  if (to && from) {
    const filteredExpenses = expenses.filter((expense) => {
      const spentAt = new Date(expense.spentAt);

      return spentAt >= new Date(from) && spentAt <= new Date(to);
    });

    return filteredExpenses;
  }

  if (userId && categories) {
    const filteredExpenses = expenses.filter(
      (expense) =>
        expense.userId === parseFloat(userId) &&
        expense.category === categories,
    );

    return filteredExpenses;
  }

  if (userId) {
    const filteredExpenses = expenses.filter(
      (expense) => expense.userId === parseFloat(userId),
    );

    return filteredExpenses;
  }

  if (userId && categories && to && from) {
    const filteredExpenses = expenses.filter(
      (expense) =>
        expense.userId === parseFloat(userId) &&
        expense.category === categories &&
        expense.spentAt >= new Date(from) &&
        expense.spentAt <= new Date(to),
    );

    return filteredExpenses;
  }
}

function getExpenseById(id) {
  return expenses.find((e) => e.id === parseFloat(id));
}

function resetAllExpenses() {
  expenses.length = 0;
}

function create(expense) {
  const id = expenses.length + 1;
  const newExpense = { id: id, ...expense };

  const userExists = getUserById(expense.userId);

  if (!userExists) {
    return;
  }

  expenses.push(newExpense);

  return newExpense;
}

function update(id, expense) {
  const foundExpense = expenses.find((e) => e.id === parseFloat(id));

  if (!foundExpense) {
    return foundExpense;
  }

  const updatedExpense = Object.assign(foundExpense, expense);

  return updatedExpense;
}

function remove(id) {
  const index = expenses.findIndex((e) => e.id === parseFloat(id));

  if (index === -1) {
    return;
  }

  expenses.splice(index, 1);

  return true;
}

module.exports = {
  getAll,
  getExpenseById,
  getExpenseByQuery,
  create,
  update,
  remove,
  resetAllExpenses,
};
