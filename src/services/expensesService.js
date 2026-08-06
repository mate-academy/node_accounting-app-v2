function createExpensesService(users, expenses) {
  let currentExpenseId = 0;
  const nextExpenseId = () => ++currentExpenseId;

  function getAllExpenses(query) {
    let result = expenses;

    if (query.userId) {
      result = result.filter((exp) => exp.userId === Number(query.userId));
    }

    if (query.categories) {
      result = result.filter((exp) => exp.category === query.categories);
    }

    if (query.from) {
      result = result.filter((exp) => exp.spentAt > query.from);
    }

    if (query.to) {
      result = result.filter((exp) => exp.spentAt < query.to);
    }

    return result;
  }

  function createExpense(expenseData) {
    const user = users.find((u) => u.id === expenseData.userId);

    if (!user) {
      return null;
    }

    const expense = {
      id: nextExpenseId(),
      ...expenseData,
    };

    expenses.push(expense);

    return expense;
  }

  function getExpenseById(expenseId) {
    return expenses.find((exp) => exp.id === expenseId);
  }

  function deleteExpense(expenseId) {
    const index = expenses.findIndex((expense) => expenseId === expense.id);

    if (index === -1) {
      return false;
    }

    expenses.splice(index, 1);

    return true;
  }

  function updateExpense(expenseId, changes) {
    const expense = expenses.find((exp) => expenseId === exp.id);

    if (!expense) {
      return null;
    }

    Object.assign(expense, changes);

    return expense;
  }

  return {
    getAllExpenses,
    createExpense,
    getExpenseById,
    deleteExpense,
    updateExpense,
  };
}

module.exports = {
  createExpensesService,
};
