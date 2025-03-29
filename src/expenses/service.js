let expenses = [];

const formatDate = () => {
  const date = new Date();

  return date.toISOString();
};

const getMaxId = () => {
  const ids = expenses.map((exp) => exp.id);

  return expenses.length === 0 ? 1 : Math.max(...ids) + 1;
};

const expensesService = {
  async getAll() {
    return expenses;
  },

  async addNew(newExpense) {
    try {
      const currentData = [...expenses];

      const doneExpense = {
        id: getMaxId(),
        ...newExpense,
        spentAt: formatDate(),
      };

      currentData.push(doneExpense);

      expenses = currentData;

      return doneExpense;
    } catch (err) {
      throw new Error(`catch error add new: ${err}`);
    }
  },

  async getOneExpense(id) {
    const foundExpense = expenses.find((exp) => exp.id === Number(id));

    if (foundExpense) {
      return foundExpense;
    } else {
      return null;
    }
  },

  async deleteExpense(id) {
    const expenseToDelete = expenses.find((exp) => exp.id === Number(id));

    if (!expenseToDelete) {
      return null;
    }

    expenses = expenses.filter((exp) => exp.id !== Number(id));

    return 1;
  },

  async updateExpense(id, body) {
    const expenseIndex = expenses.findIndex((exp) => exp.id === Number(id));

    if (expenseIndex === -1) {
      return null;
    }

    expenses[expenseIndex] = { ...expenses[expenseIndex], ...body };

    return expenses[expenseIndex];
  },
};

module.exports = { expensesService };
