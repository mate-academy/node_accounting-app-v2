let expenses = [];

const initExpenses = () => {
  expenses = [];
};

const getByQuery = (queryes) => {
  const { userId, categories, from, to } = queryes;

  return expenses.filter((e) => {
    const thisUser = userId ? userId === e.userId : true;
    const includeInCategory = categories
      ? categories.includes(e.category)
      : true;
    const fromIscorrect = from
      ? new Date(e.spentAt).valueOf() >= new Date(from).valueOf()
      : true;
    const toIsCorrect = to
      ? new Date(e.spentAt).valueOf() <= new Date(to).valueOf()
      : true;

    return thisUser && includeInCategory && fromIscorrect && toIsCorrect;
  });
};

const create = (data) => {
  const { userId, spentAt, title, amount, category, note } = data;

  let id = 1;

  while (expenses.some((expense) => expense.id === id)) {
    id++;
  }

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
};

const getById = (id) => {
  const expense = expenses.find((e) => e.id === id);

  if (!expense) {
    return null;
  }

  return expense;
};

const deleteById = (id) => {
  const expense = expenses.find((e) => e.id === id);

  if (!expense) {
    return null;
  }

  expenses = expenses.filter((e) => e.id !== id);

  return true;
};

const update = (id, data) => {
  const expense = expenses.find((e) => e.id === id);

  if (!expense) {
    return;
  }

  Object.keys(data).forEach((key) => {
    if (Object.hasOwn(expense, key) && data[key] !== undefined) {
      expense[key] = data[key];
    }
  });

  return expense;
};

module.exports = {
  initExpenses,
  getByQuery,
  create,
  getById,
  deleteById,
  update,
};
