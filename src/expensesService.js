function createExpense(body, expenses) {
  const expense = {
    id: Date.now(),
    userId: body.userId,
    spentAt: body.spentAt,
    title: body.title,
    amount: body.amount,
    category: body.category,
    note: body.note,
  };

  expenses.push(expense);

  return expense;
}

function getExpenseById(id, expenses) {
  const seekExpense = expenses.find((el) => el.id === +id);

  return seekExpense;
}

function deleteExpenseById(id, expenses) {
  const index = expenses.findIndex((el) => el.id === +id);

  if (index === -1) {
    return;
  }

  const item = expenses.splice(index, 1);

  return item[0];
}

function updateExpenseById(id, body, expense) {
  const updateExpenseIndex = expense.findIndex((el) => el.id === +id);

  expense[updateExpenseIndex].userId =
    body.userId || expense[updateExpenseIndex].userId;

  expense[updateExpenseIndex].spentAt =
    body.spentAt || expense[updateExpenseIndex].spentAt;

  expense[updateExpenseIndex].title =
    body.title || expense[updateExpenseIndex].title;

  expense[updateExpenseIndex].amount =
    body.amount || expense[updateExpenseIndex].amount;

  expense[updateExpenseIndex].category =
    body.category || expense[updateExpenseIndex].category;

  expense[updateExpenseIndex].note =
    body.note || expense[updateExpenseIndex].note;

  return expense[updateExpenseIndex];
}

const expensesService = {
  createExpense,
  getExpenseById,
  deleteExpenseById,
  updateExpenseById,
};

module.exports = expensesService;
