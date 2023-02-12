import * as ExpensesService from './expenses.service';

export const getAll = (req, res) => {
  const { userId, category, from, to } = req.params;

  const foundExpenses = ExpensesService.getAll(userId, category, from, to);

  res.statusCode = 200;
  res.send(foundExpenses);
};

export const create = (req, res) => {
  const {
    userId,
    spentAt,
    title,
    amount,
    category,
    note,
  } = req.body;

  const newExpense = ExpensesService.create(
    userId,
    spentAt,
    title,
    amount,
    category,
    note
  );

  res.statusCode = 201;

  res.send(newExpense);
};

export const getById = (req, res) => {
  const { id } = req.params;

  const foundExpense = ExpensesService.getById(id);

  if (!foundExpense) {
    res.sendStatus(404);

    return;
  }

  res.statusCode = 200;
  res.send(foundExpense);
};

export const remove = (req, res) => {
  const { id } = req.params;

  const foundExpense = ExpensesService.getById(id);

  if (!foundExpense) {
    res.sendStatus(404);

    return;
  }

  ExpensesService.remove(id);

  res.statusCode = 204;
};

export const update = (req, res) => {
  const { id } = req.params;
  const {
    spentAt,
    title,
    amount,
    category,
    note,
  } = req.body;

  const foundExpense = ExpensesService.getById(id);

  if (!foundExpense) {
    res.sendStatus(404);

    return;
  }

  if (
    typeof spentAt !== 'string'
    || typeof title !== 'string'
    || typeof amount !== 'number'
    || typeof category !== 'string'
    || typeof note !== 'string'
  ) {
    res.sendStatus(422);

    return;
  }

  ExpensesService.update({
    spentAt,
    title,
    amount,
    category,
    note,
  });

  res.statusCode = 201;

  res.send(foundExpense);
};
