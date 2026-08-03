const expenseService = require('./../services/expense.service');
const userService = require('./../services/user.service');

// function get(req, res) {
//   const { userId, categories, from, to } = req.query;

//   res.json(
//     expenseService.getAll({
//       userId,
//       categories,
//       from,
//       to,
//     }),
//   );
// }

const get = (req, res) => {
  const { userId, categories, from, to } = req.query;

  res.json(
    expenseService.getAll({
      from,
      to,
      userId,
      categories,
    }),
  );
};
const getOne = (req, res) => {
  const { id } = req.params;
  const expense = expenseService.getById(id);

  if (!expense) {
    res.sendStatus(404);

    return;
  }

  res.json(expense);
};
const create = (req, res) => {
  const { userId, spentAt, title, amount, category, note } = req.body;

  if (!userId || !spentAt || !title || !amount || !category) {
    res.sendStatus(400);

    return;
  }

  const user = userService.getById(userId);

  if (!user) {
    res.sendStatus(400);

    return;
  }

  const newExpense = expenseService.create({
    userId,
    spentAt,
    title,
    amount,
    category,
    note,
  });

  res.status(201).json(newExpense);
};
const remove = (req, res) => {
  const { id } = req.params;

  if (!expenseService.getById(id)) {
    res.sendStatus(404);

    return;
  }

  expenseService.remove(id);

  res.sendStatus(204);
};
const update = (req, res) => {
  const { id } = req.params;

  if (!expenseService.getById(id)) {
    res.sendStatus(404);

    return;
  }

  const updatedExpense = expenseService.update({ id, ...req.body });

  res.json(updatedExpense);
};

module.exports = {
  get,
  getOne,
  create,
  remove,
  update,
};
