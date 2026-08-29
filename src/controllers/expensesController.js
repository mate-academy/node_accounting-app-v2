/* eslint-disable function-paren-newline */
/* eslint-disable prettier/prettier */
function createExpensesController(state) {
  function createExpense(req, res) {
    const { userId, spentAt, title, amount, category, note } = req.body;

    if (
      userId === undefined ||
      !spentAt ||
      !title ||
      amount === undefined ||
      !category ||
      note === undefined
    ) {
      return res.status(400).json({
        message: 'Invalid expense data',
      });
    }

    const user = state.users.find((item) => item.id === Number(userId));

    if (!user) {
      return res.status(400).json({
        message: 'User not found',
      });
    }

    const expense = {
      id: state.nextExpenseId,
      userId,
      spentAt,
      title,
      amount,
      category,
      note,
    };

    state.nextExpenseId += 1;
    state.expenses.push(expense);

    return res.status(201).json(expense);
  }

  function getExpenses(req, res) {
    let result = [...state.expenses];

    const { userId, from, to, categories } = req.query;

    if (userId !== undefined) {
      result = result.filter((expense) => expense.userId === Number(userId));
    }

    if (from !== undefined) {
      result = result.filter(
        (expense) => new Date(expense.spentAt) >= new Date(from),
      );
    }

    if (to !== undefined) {
      result = result.filter(
        (expense) => new Date(expense.spentAt) <= new Date(to),
      );
    }

    if (categories !== undefined) {
      const categoryList = categories.split(',');

      result = result.filter((expense) =>
        categoryList.includes(expense.category),
      );
    }

    return res.status(200).json(result);
  }

  function getExpense(req, res) {
    const expenseId = Number(req.params.id);
    const expense = state.expenses.find((item) => item.id === expenseId);

    if (!expense) {
      return res.status(404).json({
        message: 'Expense not found',
      });
    }

    return res.status(200).json(expense);
  }

  function updateExpense(req, res) {
    const expenseId = Number(req.params.id);
    const expense = state.expenses.find((item) => item.id === expenseId);

    if (!expense) {
      return res.status(404).json({
        message: 'Expense not found',
      });
    }

    Object.assign(expense, req.body);

    return res.status(200).json(expense);
  }

  function deleteExpense(req, res) {
    const expenseId = Number(req.params.id);

    const expenseIndex = state.expenses.findIndex(
      (item) => item.id === expenseId,
    );

    if (expenseIndex === -1) {
      return res.status(404).json({
        message: 'Expense not found',
      });
    }

    state.expenses.splice(expenseIndex, 1);

    return res.status(204).send();
  }

  return {
    createExpense,
    getExpenses,
    getExpense,
    updateExpense,
    deleteExpense,
  };
}

module.exports = {
  createExpensesController,
};
