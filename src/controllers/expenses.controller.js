const { getUserById } = require('../services/user.service');

const {
  getAll,
  getById,
  create,
  update,
  remove,
} = require('../services/expenses.service');

const getExpenses = (req, res) => {
  const { categories, userId, from, to } = req.query;

  let result = getAll();

  if (categories !== undefined) {
    result = result.filter(
      (exp) => exp.category.toLowerCase() === categories.toLowerCase().trim(),
    );
  }

  if (userId !== undefined) {
    result = result.filter((exp) => Number(exp.userId) === Number(userId));
  }

  if (from) {
    const fromTime = new Date(from).getTime();

    result = result.filter(
      (exp) => new Date(exp.spentAt).getTime() >= fromTime,
    );
  }

  if (to) {
    const toTime = new Date(to).getTime();

    result = result.filter((exp) => new Date(exp.spentAt).getTime() <= toTime);
  }

  res.send(result);
};

const getOne = (req, res) => {
  const { id } = req.params;

  const expense = getById(id);

  if (!expense) {
    res.sendStatus(404);

    return;
  }
  res.send(expense);
};

const createExpense = (req, res) => {
  const { title, amount, category, note, userId, spentAt } = req.body;

  if (
    !title ||
    !amount ||
    !category ||
    !userId ||
    !spentAt ||
    !getUserById(userId)
  ) {
    return res.sendStatus(400);
  }

  res.statusCode = 201;

  const newExpense = create({
    title,
    amount,
    category,
    note,
    userId,
    spentAt,
  });

  res.send(newExpense);
};

const updateExpense = (req, res) => {
  const { id } = req.params;

  const expense = getById(id);

  if (!expense) {
    res.sendStatus(404);

    return;
  }

  if (req.body.title !== undefined && typeof req.body.title !== 'string') {
    return res.sendStatus(400);
  }

  const updatedExpense = update(id, req.body);

  res.send(updatedExpense);
};

const removeExpense = (req, res) => {
  const { id } = req.params;

  if (!getById(id)) {
    res.sendStatus(404);

    return;
  }

  remove(id);

  res.sendStatus(204);
};

module.exports = {
  getExpenses,
  getOne,
  createExpense,
  updateExpense,
  removeExpense,
};
