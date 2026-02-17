const createExpenseService = (usersService) => {
  const expenses = [];
  let indexCounter = 1;

  const getFilteredExpenses = (filters) => {
    const { userId, from, to } = filters;
    let { categories } = filters;
    let filteredExpenses = [...expenses];

    if (typeof categories === 'string') {
      categories = [categories];
    }

    if (userId) {
      filteredExpenses = filteredExpenses.filter(
        (exp) => exp.userId === Number(userId),
      );
    }

    if (categories) {
      filteredExpenses = filteredExpenses.filter((exp) => {
        return categories.includes(exp.category);
      });
    }

    if (from) {
      filteredExpenses = filteredExpenses.filter(
        (exp) => new Date(exp.spentAt) >= new Date(from),
      );
    }

    if (to) {
      filteredExpenses = filteredExpenses.filter(
        (exp) => new Date(exp.spentAt) <= new Date(to),
      );
    }

    return filteredExpenses;
  };

  const getExpenseById = (id) => {
    return expenses.find((e) => e.id === Number(id)) || null;
  };

  const addExpense = (expense) => {
    const { userId, spentAt, title, amount, category, note } = expense;
    const user = usersService.getUserById(Number(userId));

    if (!user) {
      return null;
    }

    const newExpense = {
      id: indexCounter++,
      userId: Number(userId),
      spentAt,
      title,
      amount: Number(amount),
      category,
      note,
    };

    expenses.push(newExpense);

    return newExpense;
  };

  const getUserExists = (userId) => {
    return usersService.getUserById(Number(userId));
  };

  const updateExpense = (id, updates) => {
    const expense = getExpenseById(Number(id));

    if (!expense) {
      return null;
    }

    if (updates.userId !== undefined) {
      updates.userId = Number(updates.userId);
    }

    if (updates.amount !== undefined) {
      updates.amount = Number(updates.amount);
    }

    Object.assign(expense, updates);

    return expense;
  };

  const deleteExpense = (id) => {
    const expenseIndex = expenses.findIndex((e) => e.id === Number(id));

    if (expenseIndex === -1) {
      return false;
    }

    expenses.splice(expenseIndex, 1);

    return true;
  };

  return {
    getFilteredExpenses,
    getExpenseById,
    addExpense,
    getUserExists,
    updateExpense,
    deleteExpense,
  };
};

module.exports = {
  createExpenseService,
};
