const store = require('../data/store.js');

function getAllExpenses(req, res) {
  const { userId, categories, from, to } = req.query;

  const fromTime = from ? new Date(from).getTime() : null;
  const toTime = to ? new Date(to).getTime() : null;

  const filtered = store.expenses.filter((expense) => {
    if (userId && expense.userId !== Number(userId)) {
      return false;
    }

    if (categories && expense.category !== categories) {
      return false;
    }

    const spentAtTime = new Date(expense.spentAt).getTime();

    if (fromTime !== null && spentAtTime < fromTime) {
      return false;
    }

    if (toTime !== null && spentAtTime > toTime) {
      return false;
    }

    return true;
  });

  res.send(filtered);
}

function getExpenseById(req, res) {
  const { id } = req.params;

  const expens = store.expenses.find((item) => item.id === Number(id));

  if (!expens) {
    return res.sendStatus(404);
  }

  res.status(200).send(expens);
}

function remove(req, res) {
  const { id } = req.params;

  const expenseIndex = store.expenses.findIndex(
    (item) => item.id === Number(id),
  );

  if (expenseIndex === -1) {
    return res.status(404).send(store.expenses);
  }

  store.expenses.splice(expenseIndex, 1);

  return res.sendStatus(204);
}

function create(req, res) {
  const { userId, spentAt, title, amount, category, note } = req.body;

  if (Object.keys(req.body).length === 0) {
    return res.sendStatus(400);
  }

  const findUser = store.users.find((item) => item.id === Number(userId));

  if (!findUser) {
    return res.sendStatus(400);
  }

  const expenses = {
    id: store.getNextExpenseId(),
    userId,
    spentAt,
    title,
    amount,
    category,
    note,
  };

  store.expenses.push(expenses);
  res.status(201).send(expenses);
}

function update(req, res) {
  const { id } = req.params;
  const { title } = req.body;

  const expens = store.expenses.find((item) => item.id === Number(id));

  if (!expens || !title) {
    return res.status(404).send(store.expenses);
  }

  expens.title = title;

  return res.status(200).send(expens);
}

module.exports = {
  getAllExpenses,
  getExpenseById,
  remove,
  create,
  update,
};
