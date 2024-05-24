const { response } = require('../constants/response');
const {
  getAllExpenses,
  postExpense,
  getExpenseById,
  deleteExpenseById,
  updateExpenseById,
} = require('../models/expenses.model');

async function httpGetAllExpenses(req, res) {
  const expenses = await getAllExpenses();

  if (!expenses) {
    return res.status(response[503].statusCode).json({
      success: false,
      error: response[503].messages.serviceOrExpenses,
    });
  }

  return res.status(response[200].statusCode).json(expenses);
}

async function httpPostExpense(req, res) {
  const expense = req.body;

  const { userId, spentAt, title, amount, category } = expense;

  const noData =
    !userId || !spentAt.trim() || !title.trim() || !amount || !category.trim();

  const wrongData =
    typeof userId !== 'number' ||
    typeof amount !== 'number' ||
    typeof spentAt !== 'string' ||
    typeof title !== 'string' ||
    typeof category !== 'string';

  if (!expense || noData || wrongData) {
    return res
      .status(response[400].statusCode)
      .json({ success: false, error: response[400].messages.noDataExpense });
  }

  const newExpense = await postExpense(expense);

  return res.status(response[201].statusCode).json(newExpense);
}

async function httpGetExpenseById(req, res) {
  const { id } = req.params;

  if (!id.trim()) {
    return res
      .status(response[400].statusCode)
      .json({ success: false, error: response[400].messages.noID });
  }

  const expense = await getExpenseById(+id);

  if (!expense) {
    return res
      .status(response[404].statusCode)
      .json({ success: false, error: response[404].messages.noExpense });
  }

  return res.status(response[200].statusCode).json(expense);
}

async function httpDeleteExpenseById(req, res) {
  const { id } = req.params;

  if (!id.trim()) {
    return res
      .status(response[400].statusCode)
      .json({ success: false, error: response[400].messages.noID });
  }

  const deleted = await deleteExpenseById(+id);

  if (deleted) {
    return res.status(response[204].statusCode).json({});
  } else {
    return res
      .status(response[404].statusCode)
      .json({ error: response[404].messages.noExpense });
  }
}

async function httpUpdateExpenseById(req, res) {
  const data = req.body;
  const { id } = req.params;

  if (!Object.values(data).length) {
    return res
      .status(response[400].statusCode)
      .json({ success: false, error: response[400].messages.noData });
  }

  const newExpense = await updateExpenseById(+id, data);

  if (!newExpense) {
    return res
      .status(response[404].statusCode)
      .json({ success: false, error: response[404].messages.noExpense });
  }

  return res.status(response[200].statusCode).json(newExpense);
}

module.exports = {
  httpGetAllExpenses,
  httpPostExpense,
  httpGetExpenseById,
  httpDeleteExpenseById,
  httpUpdateExpenseById,
};
