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

function findUser(id, users) {
  return users.find((el) => el.id === id);
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

function updateExpenseById(id, body, patchingExpense) {
  for (const prop in body) {
    if (body[prop]) {
      patchingExpense[prop] = body[prop];
    }
  }

  return patchingExpense;
}

const expensesService = {
  createExpense,
  getExpenseById,
  findUser,
  deleteExpenseById,
  updateExpenseById,
};

module.exports = expensesService;
