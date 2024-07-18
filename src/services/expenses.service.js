const { users } = require('./users.service');

let expenses = [];
let lastId = 0;

function getAll(req, res) {
  const searchParams = new URLSearchParams(req.url.split('?')[1]);

  const userId = searchParams.get('userId');
  const category = searchParams.get('category');
  const from = searchParams.get('from');
  const to = searchParams.get('to');

  let sortedExpenses = [...expenses];

  if (userId) {
    sortedExpenses = sortedExpenses.filter((exp) => exp.userId === +userId);
  }

  if (category) {
    sortedExpenses = sortedExpenses.filter((exp) => exp.category === category);
  }

  if (from) {
    sortedExpenses = sortedExpenses.filter(
      (exp) => Date(exp.spentAt) >= Date(from),
    );
  }

  if (to) {
    sortedExpenses = sortedExpenses.filter(
      (exp) => Date(exp.spentAt) <= Date(to),
    );
  }

  res.send(sortedExpenses.sort((a, b) => a.id - b.id));
}

function getOne(req, res) {
  const id = req.params.id;
  const response = expenses.find((item) => item.id === +id);

  if (response) {
    res.send(response);

    return;
  }

  res.sendStatus(404);
}

function createExpense(req, res) {
  const { userId, spentAt, title, amount, category, note } = req.body;

  if (
    !userId ||
    !spentAt ||
    !title ||
    !amount ||
    !category ||
    !note ||
    users.filter((user) => user.id === +userId).length === 0
  ) {
    res.sendStatus(400);

    return;
  }

  lastId++;

  const expense = {
    id: lastId,
    userId,
    spentAt,
    title,
    amount,
    category,
    note,
  };

  expenses.push(expense);

  res.statusCode = 201;
  res.send(expense);
}

function deleteExpense(req, res) {
  const id = req.params.id;

  const deletedExpense = expenses.find((item) => item.id === +id);

  if (deletedExpense) {
    expenses = expenses.filter((item) => item.id !== deletedExpense.id);
    res.sendStatus(204);
  } else {
    res.sendStatus(404);
  }
}

function updateOne(req, res) {
  const id = req.params.id;
  const data = req.body;

  if (expenses.filter((exp) => exp.id === +id).length === 0) {
    res.sendStatus(404);

    return;
  }

  let expenseToUpdate = expenses.find((item) => item.id === +id);
  const index = expenses.indexOf(expenseToUpdate);

  expenseToUpdate = { ...expenseToUpdate, ...data };
  expenses[index] = expenseToUpdate;

  res.send(expenseToUpdate);
}

module.exports = {
  getAll,
  createExpense,
  deleteExpense,
  updateOne,
  getOne,
};
