const {
  getExpenses,
  getExpenseById,
  addExpense,
  updatedExpense,
  deleteExpense,
} = require('../services/productService');

function getAll(req, res) {
  const { userId, categories, from, to } = req.query;

  const expenses = getExpenses(
    userId,
    categories ? categories.split(',') : null,
    from,
    to,
  );

  // Отправляем JSON-ответ
  res.status(200).json(expenses);
}

function getAllById(req, res) {
  const { id } = req.params;
  const expense = getExpenseById(+id);

  if (!expense) {
    return res.status(404).send('Expense not found');
  }

  res.status(200).json(expense);
}

function create(req, res) {
  const { userId, spentAt, title, amount, category, note } = req.body;

  // Проверяем, что все обязательные поля присутствуют
  if (!userId || !spentAt || !title || !amount || !category) {
    return res.status(400).send('Missing required fields');
  }

  try {
    const Expense = addExpense({
      userId,
      spentAt,
      title,
      amount,
      category,
      note,
    });

    // Если все прошло успешно, возвращаем новый расход с кодом 201
    res.status(201).json(Expense);
  } catch (error) {
    res.status(400).send(error.message);
  }
}

function update(req, res) {
  const { id } = req.params;
  const updates = req.body;

  const updateExpense = updatedExpense(Number(id), updates);

  if (!updateExpense) {
    return res.status(404).send('Expense not found');
  }

  res.status(200).json(updateExpense);
}

function deletedExpense(req, res) {
  const { id } = req.params;

  const removedExpense = deleteExpense(Number(id));

  if (!removedExpense) {
    return res.status(404).send('Expense not found');
  }

  res.status(204).send();
}

module.exports = {
  getAll,
  getAllById,
  create,
  update,
  delete: deletedExpense,
};
