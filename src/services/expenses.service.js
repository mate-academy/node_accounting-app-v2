const expenses = [];

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
    const toIsCorrect = userId
      ? new Date(e.spentAt).valueOf() <= new Date(to).valueOf()
      : true;

    return thisUser && includeInCategory && fromIscorrect && toIsCorrect;
  });
};

const getById = (id) => {
  const expense = expenses.find((e) => e.id === id);

  return expense;
};

const create = (data) => {
  const { userId, spentAt, title, amount, category, note } = data;
  let accessibleId;

  for (let i = 1; true; i++) {
    const idExist = expenses.some((e) => e.id === i);

    if (!idExist) {
      accessibleId = i;

      break;
    }
  }

  const newExpense = {
    id: accessibleId,
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

const deleteById = (id) => {
  const index = expenses.findIndex((e) => e.id === id);

  if (index === -1) {
    return null;
  }

  return expenses.splice(index, 1);
};

const update = (id, data) => {
  const { spentAt, title, amount, category, note } = data;

  const expense = expenses.find((e) => e.id === id);

  if (!expense) {
    return;
  }

  return Object.assign(expense, {
    spentAt,
    title,
    amount,
    category,
    note,
  });
};

module.exports = {
  getByQuery,
  getById,
  create,
  deleteById,
  update,
};
