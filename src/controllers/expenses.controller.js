const expensesServices = require('./../services/expenses.service');
const userServices = require('./../services/user.service');

const get = (req, res) => {
  const query = req.query;

  if (query) {
    const expenses = expensesServices.getByQuery(query);

    res.send(expenses);

    return;
  }

  res.send(expensesServices.get());
};

const getOne = (req, res) => {
  const { id } = req.params;

  if (!id) {
    res.sendStatus(400);

    return;
  }

  const expense = expensesServices.getOne(+id);

  if (!expense) {
    res.sendStatus(404);

    return;
  }

  res.send(expense);
};

const create = (req, res) => {
  const { userId, spentAt, title, amount, category, note } = req.body;

  if (
    !title ||
    !spentAt ||
    !amount ||
    !category ||
    !userServices.getOne(+userId)
  ) {
    res.sendStatus(400);

    return;
  }

  const newExpense = expensesServices.create({
    userId,
    spentAt,
    title,
    amount,
    category,
    note,
  });

  res.statusCode = 201;
  res.send(newExpense);
};

const update = (req, res) => {
  const { id } = req.params;
  const { title, spentAt, amount, category, note } = req.body;

  if (!expensesServices.getOne(+id)) {
    res.sendStatus(404);

    return;
  }

  const payload = {
    id: +id,
  };

  if (title) {
    payload.title = title;
  }

  if (spentAt) {
    payload.spentAt = spentAt;
  }

  if (amount) {
    payload.amount = amount;
  }

  if (category) {
    payload.category = category;
  }

  if (note) {
    payload.note = note;
  }

  if (Object.keys(payload).length === 1) {
    res.sendStatus(400);

    return;
  }

  const updatedExpense = expensesServices.update(payload);

  res.send(updatedExpense);
};

const remove = (req, res) => {
  const { id } = req.params;

  if (!expensesServices.getOne(+id)) {
    res.sendStatus(404);

    return;
  }

  expensesServices.remove(+id);
  res.sendStatus(204);
};

module.exports = {
  get,
  getOne,
  create,
  update,
  remove,
};
