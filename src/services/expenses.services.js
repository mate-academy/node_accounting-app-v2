let expenses = [];

const getAllExpenses = (query) => {
  let filteredExpenses = expenses;

  if (query) {
    const from = query.from ? new Date(query.from) : null;
    const to = query.to ? new Date(query.to) : null;
    const category = query.categories || null;
    const userId = query.userId || null;

    if (from) {
      filteredExpenses = filteredExpenses.filter((item) => {
        return new Date(item.spentAt) >= from;
      });
    }

    if (to) {
      filteredExpenses = filteredExpenses.filter((item) => {
        return new Date(item.spentAt) <= to;
      });
    }

    if (category) {
      filteredExpenses = filteredExpenses.filter((item) => {
        return item.category === category;
      });
    }

    if (userId) {
      filteredExpenses = filteredExpenses.filter((item) => {
        return +item.userId === +userId;
      });
    }
  }

  return filteredExpenses;
};

const addExpense = (expense) => {
  expenses.push(expense);
};

const findExpense = (id) => {
  return expenses.find((item) => +item.userId === +id);
};

const filteredByIdExpenses = (id) => {
  return expenses.filter((item) => +item.userId !== +id);
};

const changeExpense = (newExpenses) => {
  expenses = newExpenses;
};

module.exports = {
  getAllExpenses,
  addExpense,
  findExpense,
  filteredByIdExpenses,
  changeExpense,
};
