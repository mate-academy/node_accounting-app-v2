'use strict';

function createExpensesController({ expenses, users, expenseIdSeq }) {
  return {
    // POST /expenses - cria despesa
    createExpense: (req, res) => {
      const { userId, spentAt, title, amount, category, note } = req.body || {};

      const missing =
        typeof userId === 'undefined' ||
        !spentAt ||
        !title ||
        typeof amount === 'undefined' ||
        !category ||
        !note;

      if (missing) {
        return res.status(400).json({ message: 'Missing required fields' });
      }

      const user = users.find((u) => u.id === Number(userId));

      if (!user) {
        return res.status(400).json({ message: 'User not found' });
      }

      const expense = {
        id: expenseIdSeq.value++,
        userId: Number(userId),
        spentAt,
        title,
        amount,
        category,
        note,
      };

      expenses.push(expense);

      return res.status(201).json(expense);
    },

    // GET /expenses - lista despesas com filtros
    getExpenses: (req, res) => {
      const { userId, categories, from, to } = req.query;
      let result = expenses.slice();

      if (userId) {
        const idNum = Number(userId);

        result = result.filter((e) => e.userId === idNum);
      }

      if (categories) {
        const list = String(categories).split(',');

        result = result.filter((e) => list.includes(e.category));
      }

      if (from || to) {
        const fromTs = from ? new Date(from).getTime() : -Infinity;
        const toTs = to ? new Date(to).getTime() : Infinity;

        result = result.filter((e) => {
          const ts = new Date(e.spentAt).getTime();

          return ts >= fromTs && ts <= toTs;
        });
      }

      return res.status(200).json(result);
    },

    // GET /expenses/:id - obtém despesa por id
    getExpense: (req, res) => {
      const id = Number(req.params.id);
      const exp = expenses.find((e) => e.id === id);

      if (!exp) {
        return res.status(404).json({ message: 'Expense not found' });
      }

      return res.status(200).json(exp);
    },

    // PATCH /expenses/:id - atualiza despesa
    updateExpense: (req, res) => {
      const id = Number(req.params.id);
      const exp = expenses.find((e) => e.id === id);

      if (!exp) {
        return res.status(404).json({ message: 'Expense not found' });
      }

      const updates = req.body || {};

      if (typeof updates.userId !== 'undefined') {
        const userFound = users.find(
          (user) => user.id === Number(updates.userId),
        );

        if (!userFound) {
          return res.status(400).json({ message: 'User not found' });
        }

        exp.userId = Number(updates.userId);
      }

      if (typeof updates.spentAt !== 'undefined') {
        exp.spentAt = updates.spentAt;
      }

      if (typeof updates.title !== 'undefined') {
        exp.title = updates.title;
      }

      if (typeof updates.amount !== 'undefined') {
        exp.amount = updates.amount;
      }

      if (typeof updates.category !== 'undefined') {
        exp.category = updates.category;
      }

      if (typeof updates.note !== 'undefined') {
        exp.note = updates.note;
      }

      return res.status(200).json(exp);
    },

    // DELETE /expenses/:id - remove despesa
    deleteExpense: (req, res) => {
      const id = Number(req.params.id);
      const index = expenses.findIndex((e) => e.id === id);

      if (index === -1) {
        return res.status(404).json({ message: 'Expense not found' });
      }

      expenses.splice(index, 1);

      return res.status(204).end();
    },
  };
}

module.exports = { createExpensesController };
