function createExpensesService(usersService) {
  const expenses = [];
  let count = 0;

  const getId = () => {
    return count++;
  };

  return {
    getAll({ userId, categories, from, to }) {
      return expenses.filter((expense) => {
        const preparedCategories = categories
          ? categories.split(',')
          : undefined;
        const spendDate = new Date(expense.spentAt);
        const fromDate = new Date(from);
        const toDate = new Date(to);
        let matches = true;

        if (userId !== undefined) {
          if (expense.userId !== +userId) {
            matches = false;
          }
        }

        if (preparedCategories !== undefined) {
          if (!preparedCategories.includes(expense.category)) {
            matches = false;
          }
        }

        if (from !== undefined) {
          if (spendDate < fromDate) {
            matches = false;
          }
        }

        if (to !== undefined) {
          if (spendDate > toDate) {
            matches = false;
          }
        }

        return matches;
      });
    },

    create({ userId, spentAt, title, amount, category, note = '' }) {
      if (!usersService.getById(userId)) {
        return;
      }

      const expense = {
        id: getId(),
        userId,
        spentAt,
        title,
        amount,
        category,
        note,
      };

      expenses.push(expense);

      return expense;
    },

    getById(id) {
      return expenses.find((item) => item.id === id);
    },

    deleteById(id) {
      const index = expenses.findIndex((item) => item.id === id);

      if (index === -1) {
        return;
      }

      const [expense] = expenses.splice(index, 1);

      return expense;
    },

    fullUpdateById({
      id,
      userId,
      spentAt,
      title,
      amount,
      category,
      note = '',
    }) {
      const expense = expenses.find((item) => item.id === id);

      if (!expense) {
        return;
      }

      return Object.assign(expense, {
        userId,
        spentAt,
        title,
        amount,
        category,
        note,
      });
    },
    partUpdateById({ id, userId, spentAt, title, amount, category, note }) {
      const expense = expenses.find((item) => item.id === id);

      if (!expense) {
        return;
      }

      const updatedArgs = {};

      if (userId !== undefined) {
        updatedArgs.userId = userId;
      }

      if (spentAt !== undefined) {
        updatedArgs.spentAt = spentAt;
      }

      if (title !== undefined) {
        updatedArgs.title = title;
      }

      if (amount !== undefined) {
        updatedArgs.amount = amount;
      }

      if (category !== undefined) {
        updatedArgs.category = category;
      }

      if (note !== undefined) {
        updatedArgs.note = note;
      }

      return Object.assign(expense, updatedArgs);
    },
  };
}

module.exports = {
  createExpensesService,
};
