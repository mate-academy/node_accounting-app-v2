let expenses;

function createExpenses() {
  expenses = [];
}

function getId() {
  const ids = expenses.map((e) => e.id);

  return expenses.length === 0 ? 0 : Math.max(...ids) + 1;
}

function getAll({ userId, categories, from, to }) {
  let expensesCopy = [...expenses];

  if (userId) {
    expensesCopy = expensesCopy.filter(
      (expense) => String(expense.userId) === String(userId),
    );
  }

  if (categories) {
    expensesCopy = expensesCopy.filter((e) => categories.includes(e.category));
  }

  if (from && to) {
    const fromDate = new Date(from);
    const toDate = new Date(to);

    expensesCopy = expensesCopy.filter((expense) => {
      const expenceDate = new Date(expense.spentAt);

      return expenceDate > fromDate && expenceDate < toDate;
    });
  }

  return expensesCopy;
}

function getById(id) {
  return expenses.find((expense) => String(expense.id) === String(id));
}

function create({ userId, spentAt, title, amount, category, note }) {
  const expense = {
    id: getId(),
    userId,
    spentAt,
    title,
    amount,
    category,
    note,
  };

  expenses.push(expense);

  return expense;
}

function deleteById(id) {
  const index = expenses.findIndex((e) => String(e.id) === String(id));

  if (index === -1) {
    return;
  }

  const [expense] = expenses.splice(index, 1);

  return expense;
}

function update(id, params) {
  const expense = getById(id);

  if (!expense) {
    return;
  }

  return Object.assign(expense, params);
}

module.exports = {
  createExpenses,
  getAll,
  getById,
  create,
  deleteById,
  update,
};
