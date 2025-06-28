const expenses = [];
let nextExpenseId = 1;

const expensesService = {
  getExpenses: () => expenses,
  reset: () => {
    expenses.length = 0;
    nextExpenseId = 1;
  },
  createExpense: (userId, spentAt, title, amount, category, note) => {
    const expense = {
      id: nextExpenseId++,
      userId,
      spentAt,
      title,
      amount,
      category,
      note,
    };

    expenses.push(expense);

    return expense;
  },

  getExpense: (id) => {
    const expense = expenses.find((e) => e.id === id);

    if (!expense) {
      return null;
    }

    return expense;
  },
  deleteExpense: (id) => {
    const index = expenses.findIndex((e) => e.id === id);

    if (index === -1) {
      return false;
    }

    expenses.splice(index, 1);

    return true;
  },
  updateExpense: (id, spentAt, title, amount, category, note) => {
    const expense = expenses.find((e) => e.id === id);

    if (!expense) {
      return null;
    }

    if (spentAt !== undefined) {
      expense.spentAt = spentAt;
    }

    if (title !== undefined) {
      expense.title = title;
    }

    if (amount !== undefined) {
      expense.amount = amount;
    }

    if (category !== undefined) {
      expense.category = category;
    }

    if (note !== undefined) {
      expense.note = note;
    }

    return expense;
  },
};

module.exports = {
  expensesService,
};
