let expenses = [];

function getAll({ userId, categories, from, to }) {
  // eslint-disable-next-line no-console
  console.log('getAll params:', {
    userId,
    categories,
    from,
    to,
  });

  let exp = expenses;

  if (userId) {
    exp = exp.filter((item) => item.userId === +userId);
    // eslint-disable-next-line no-console
    console.log('after userId:', exp);
  }

  if (categories) {
    exp = exp.filter((item) => categories.includes(item.category));
    // eslint-disable-next-line no-console
    console.log('after categories:', exp);
  }

  if (from) {
    const afterDate = new Date(from);

    exp = exp.filter((item) => new Date(item.spentAt) >= afterDate);
    // eslint-disable-next-line no-console
    console.log('after from:', exp);
  }

  if (to) {
    const beforeDate = new Date(to);

    exp = exp.filter((item) => new Date(item.spentAt) <= beforeDate);
    // eslint-disable-next-line no-console
    console.log('after to:', exp);
  }

  return exp;
}

function getById(id) {
  return expenses.find((exp) => exp.id === +id);
}

function create({ userId, spentAt, title, amount, category, note }) {
  const exp = {
    id: Date.now(),
    userId: +userId,
    spentAt,
    title,
    amount: +amount,
    category,
    note,
  };

  expenses.push(exp);

  return exp;
}

function deleteById(id) {
  const index = expenses.findIndex((item) => item.id === +id);

  if (index === -1) {
    return null;
  }

  const [exp] = expenses.splice(index, 1);

  return exp;
}

function update({ id, spentAt, title, amount, category, note }) {
  const exp = expenses.find((item) => item.id === +id);

  if (!exp) {
    return null;
  }

  if (spentAt !== undefined) {
    exp.spentAt = spentAt;
  }

  if (title !== undefined) {
    exp.title = title;
  }

  if (amount !== undefined) {
    exp.amount = +amount;
  }

  if (category !== undefined) {
    exp.category = category;
  }

  if (note !== undefined) {
    exp.note = note;
  }

  return exp;
}

const resetExpenses = () => {
  expenses = [];
};

module.exports = {
  getAll,
  getById,
  create,
  deleteById,
  update,
  resetExpenses,
};
