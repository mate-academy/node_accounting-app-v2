const expenses = [];
let idCounter = 0;

function getAll(query) {
  const { userId, from, to, categories } = query;
  let filteredExpenses = expenses;

  if (userId) {
    filteredExpenses = filteredExpenses.filter(
      (exp) => exp.userId === Number(userId),
    );
  }

  if (from && to) {
    const fromTime = Date.parse(from);
    const toTime = Date.parse(to);

    filteredExpenses = filteredExpenses.filter((expense) => {
      const expenseTime = Date.parse(expense.spentAt);

      return expenseTime >= fromTime && expenseTime <= toTime;
    });
  }

  if (categories) {
    filteredExpenses = filteredExpenses.filter(
      (exp) => exp.category === categories,
    );
  }

  return filteredExpenses;
}

function getById(id) {
  return expenses.find((exp) => exp.id === id);
}

function create(expenseBody) {
  idCounter++;

  const expense = { id: idCounter, ...expenseBody };

  expenses.push(expense);

  return expense;
}

function deleteById(id) {
  const index = expenses.findIndex((u) => u.id === id);

  if (index === -1) {
    return;
  }

  const [expense] = expenses.splice(index, 1);

  return expense;
}

function update({ id, expenseBody }) {
  const expense = getById(id);

  if (!expense) {
    return;
  }

  return Object.assign(expense, expenseBody);
}

function reset() {
  expenses.length = 0;
  idCounter = 0;
}

module.exports = {
  getAll,
  getById,
  create,
  deleteById,
  update,
  reset,
};
