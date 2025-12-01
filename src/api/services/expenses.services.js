let expenses = [];

function cleanExpensesData() {
  return (expenses = []);
}

function getAll(filters) {
  let result = expenses.slice();

  if (filters.userId) {
    result = result.filter((e) => +e.userId === +filters.userId);
  }

  if (filters.categories && filters.categories.length) {
    result = result.filter((e) => filters.categories.includes(e.category));
  }

  const fromTs = filters.from ? Date.parse(filters.from) : NaN;
  const toTs = filters.to ? Date.parse(filters.to) : NaN;

  result = result.filter((e) => {
    const t = Date.parse(e.spentAt);

    return (isNaN(fromTs) || t >= fromTs) && (isNaN(toTs) || t <= toTs);
  });

  return result;
}

function getExpense(id) {
  return expenses.find((expens) => +expens.id === +id);
}

function createExpense(userId, spentAt, title, amount, category, note) {
  const id = expenses.length ? expenses[expenses.length - 1].id + 1 : 1;
  const newExpense = {
    id,
    userId,
    spentAt,
    title,
    amount,
    category,
    note,
  };

  expenses.push(newExpense);

  return newExpense;
}

function updateExpense({ id, userId, spentAt, title, amount, category, note }) {
  const expenseToUpdate = expenses.find((expense) => +expense.id === +id);

  if (!expenseToUpdate) {
    return;
  }

  const updatableParams = [
    'userId',
    'spentAt',
    'title',
    'amount',
    'category',
    'note',
  ];
  const data = {
    userId,
    spentAt,
    title,
    amount,
    category,
    note,
  };
  const updates = {};

  for (const elem of updatableParams) {
    if (!Object.prototype.hasOwnProperty.call(data, elem)) {
      continue;
    }

    const val = data[elem];

    if (val === undefined) {
      continue;
    }

    if (elem === 'userId' || elem === 'amount') {
      const num = Number(val);

      if (Number.isNaN(num)) {
        continue;
      }
      updates[elem] = num;
      continue;
    }

    if (elem === 'spentAt') {
      const t = Date.parse(val);

      if (isNaN(t)) {
        continue;
      }
      updates[elem] = val;
      continue;
    }
    updates[elem] = val;
  }

  return Object.assign(expenseToUpdate, updates);
}

function deleteExpense(id) {
  const index = expenses.findIndex((expense) => +expense.id === +id);

  if (index === -1) {
    return;
  }

  const [expenseDeleted] = expenses.splice(index, 1);

  return expenseDeleted;
}

const expensesServices = {
  getAll,
  getExpense,
  createExpense,
  updateExpense,
  deleteExpense,
};

module.exports = {
  cleanExpensesData,
  expensesServices,
};
