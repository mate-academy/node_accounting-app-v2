const { users } = require('./users.service');

let expenses = [];

let nextExpenseId = 1;

function getAllExpenses(query) {
  const { userId, categories, from, to } = query;
  let filteredExpenses = [...expenses];

  if (userId) {
    filteredExpenses = filteredExpenses.filter((e) => e.userId === +userId);
  }

  if (from || to) {
    const startDate = from ? new Date(from) : null;
    const endDate = to ? new Date(to) : null;

    filteredExpenses = filteredExpenses.filter((e) => {
      const spentAtDate = new Date(e.spentAt);

      if (isNaN(spentAtDate.getTime())) {
        return false;
      }

      return (
        (!startDate || spentAtDate >= startDate) &&
        (!endDate || spentAtDate <= endDate)
      );
    });
  }

  if (categories) {
    let categoriesArray;

    if (Array.isArray(categories)) {
      categoriesArray = categories;
    } else if (typeof categories === 'string') {
      if (categories.includes(',')) {
        categoriesArray = categories.split(',').map((cat) => cat.trim());
      } else {
        categoriesArray = [categories.trim()];
      }
    }

    filteredExpenses = filteredExpenses.filter((e) => {
      const match = categoriesArray.includes(e.category);

      return match;
    });
  }

  return filteredExpenses;
}

function getExpense(expenseId) {
  const expense = expenses.find((e) => e.id === +expenseId);

  return expense;
}

function addExpense(body) {
  const { userId, spentAt, title, amount, category, note } = body;

  const userExists = users.some((u) => u.id === +userId);

  if (!userExists) {
    return false;
  }

  const expense = {
    id: nextExpenseId++,
    userId: +userId,
    spentAt: spentAt || new Date().toISOString(),
    title,
    amount: Number(amount),
    category: category || 'Uncategorized',
    note: note || '',
  };

  expenses.push(expense);

  return expense;
}

function removeExpense(expenseId) {
  const indexOfExpense = expenses.findIndex((e) => e.id === +expenseId);

  if (indexOfExpense !== -1) {
    expenses.splice(indexOfExpense, 1);

    return true;
  }

  return false;
}

function changeExpense(expenseId, body) {
  const indexOfExpense = expenses.findIndex((e) => e.id === +expenseId);

  if (indexOfExpense === -1) {
    return -1;
  }

  if (Object.keys(body).length === 0) {
    return false;
  }

  expenses[indexOfExpense] = { ...expenses[indexOfExpense], ...body };

  return expenses[indexOfExpense];
}

const resetExpenses = () => {
  expenses = [];
};

module.exports = {
  getAllExpenses,
  getExpense,
  addExpense,
  removeExpense,
  changeExpense,
  resetExpenses,
};
