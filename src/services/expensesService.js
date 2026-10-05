const createExpensesService = (expenses, usersService) => {
  const findExpense = (userId, from, to, categories) => {
    const initialDate = new Date(from);
    const finalDate = new Date(to);
    let filteredExpenses = expenses;

    if (userId) {
      filteredExpenses = expenses.filter(expense => expense.userId === Number(userId));
    }

    if (from && to) {
       filteredExpenses = filteredExpenses.filter((expense) => new Date(expense.spentAt) >= initialDate && new Date(expense.spentAt) <= finalDate);
    }

    if (categories) {
      filteredExpenses = filteredExpenses.filter(expense => expense.category === categories);
    }

    return filteredExpenses;
  };

  const findExpenseById = (id) => {
    const expense = expenses.find((userId) => userId.id === Number(id));

    return expense;
  };

  const createExpense = (newExpense) => {
    if (!usersService.findUserById(newExpense.userId)) {
      return null;
    } else {
      const id = expenses.length + 1;
      const expense = {
        id,
        ...newExpense,
      };

      expenses.push(expense);

      return expense;
    }
  };

  const patchExpenseById = (id, newData) => {
    const position = expenses.findIndex(
      (positionId) => positionId.id === Number(id),
    );

    if (position === -1) {
      return null;
    }

    const updatedExpense = {
      ...expenses[position],
      ...newData,
    };

    expenses[position] = updatedExpense;

    return updatedExpense;
  };

  const deleteExpenseById = (id) => {
    const position = expenses.findIndex(
      (expenseId) => expenseId.id === Number(id),
    );

    if (position === -1) {
      return null;
    }

    const expenseDeleted = expenses.splice(position, 1);

    return expenseDeleted[0];
  };

  return {
    findExpense,
    findExpenseById,
    createExpense,
    patchExpenseById,
    deleteExpenseById,
  };
};

module.exports = {
  createExpensesService,
};
