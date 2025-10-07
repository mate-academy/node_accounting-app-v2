const expenses = [];
let idCounter = 1;

function getAll({ userId, from, to, categories } = {}) {
  let result = expenses;

  if (userId != null) {
    result = result.filter((e) => e.userId === Number(userId));
  }

  if (from && to) {
    const fromDate = new Date(from);
    const toDate = new Date(to);

    result = result.filter((e) => {
      const d = new Date(e.spentAt);

      return d >= fromDate && d <= toDate;
    });
  }

  if (categories != null) {
    let categoryList;

    if (Array.isArray(categories)) {
      categoryList = categories;
    } else {
      categoryList = String(categories)
        .split(',')
        .map((c) => c.trim());
    }

    result = result.filter((e) => categoryList.includes(e.category));
  }

  return result;
}

function getById(id) {
  return expenses.find((e) => e.id === Number(id)) || null;
}

function create({ userId, spentAt, title, amount, category, note }) {
  const numAmount = Number(amount);
  const expense = {
    id: idCounter++,
    userId: Number(userId),
    spentAt,
    title,
    amount: numAmount,
    category,
    note: note || '',
  };

  expenses.push(expense);

  return expense;
}

function update(id, data) {
  const expense = getById(id);

  if (!expense) {
    return null;
  }
  Object.assign(expense, data);

  return expense;
}

function remove(id) {
  const index = expenses.findIndex((e) => e.id === Number(id));

  if (index === -1) {
    return null;
  }

  return expenses.splice(index, 1)[0];
}

function reset() {
  expenses.length = 0;
  idCounter = 1;
}

module.exports = {
  getAll,
  getById,
  create,
  update,
  remove,
  reset,
};
