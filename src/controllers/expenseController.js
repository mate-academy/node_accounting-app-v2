const { users } = require('./userController');

const expenses = [];

const getExpenses = async (req, res) => {
  const { userId, from, to, categories } = req.query;

  let filteredExpenses = expenses;

  if (userId) {
    filteredExpenses = filteredExpenses.filter(
      (expense) => expense.userId === Number(userId),
    );
  }

  if (from && to) {
    const fromDate = new Date(from);
    const toDate = new Date(to);

    filteredExpenses = filteredExpenses.filter((expense) => {
      const spentAt = new Date(expense.spentAt);

      return spentAt >= fromDate && spentAt <= toDate;
    });
  }

  if (categories) {
    filteredExpenses = filteredExpenses.filter(
      (expense) => expense.category === categories,
    );
  }

  return res.status(200).json(filteredExpenses);
};

const getExpense = async (req, res) => {
  const { id } = req.params;
  const expenseId = Number(id);

  if (isNaN(expenseId)) {
    return res.status(400).json({ error: 'ID inválido' });
  }

  const expense = expenses.find((exp) => exp.id === expenseId);

  if (!expense) {
    return res.status(404).json({ error: 'Item não encontrado' });
  }

  return res.status(200).json(expense);
};

const postExpense = async (req, res) => {
  const { userId, spentAt, title, amount, category, note } = req.body;

  const numericUserId = Number(userId);

  const userExists = users.find((user) => user.id === Number(userId));

  if (!userExists) {
    return res.status(400).json({ message: 'User not found' });
  }

  const newExpense = {
    id: expenses.length + 1,
    userId: numericUserId,
    spentAt,
    title,
    amount,
    category,
    note,
  };

  expenses.push(newExpense);

  return res.status(201).json(newExpense);
};

const patchExpense = async (req, res) => {
  const { id } = req.params;
  const expenseId = Number(id);

  const expenseIndex = expenses.findIndex((exp) => exp.id === expenseId);

  if (expenseIndex === -1) {
    return res.status(404).json({ error: 'Expense not found' });
  }

  const updateData = req.body;

  if (Object.keys(updateData).length === 0) {
    return res.status(400).json({ error: 'No data provided to update' });
  }

  expenses[expenseIndex] = { ...expenses[expenseIndex], ...updateData };

  return res.status(200).json(expenses[expenseIndex]);
};

const deleteExpense = async (req, res) => {
  const { id } = req.params;
  const expenseId = Number(id);

  const index = expenses.findIndex((exp) => exp.id === expenseId);

  if (index === -1) {
    return res.status(404).json({
      error: 'Item nao encontrado',
    });
  }

  expenses.splice(index, 1);

  return res.status(204).send();
};

module.exports = {
  expenses,
  getExpenses,
  getExpense,
  postExpense,
  patchExpense,
  deleteExpense,
};
