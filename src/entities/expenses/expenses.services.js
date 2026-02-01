class ExpensesService {
  constructor() {
    this.expesnses = [];
  }

  getExpenseByID = (id) => {
    return this.expesnses.find(({ id: userID }) => userID === id);
  };

  getAllExpenses = ({ categories, userId, from, to } = {}) => {
    let expenses = this.expesnses;

    if (from || to) {
      expenses = expenses.filter((expense) => {
        const fromTimestamp = new Date(from).getTime();
        const toTimestamp = new Date(to).getTime();
        const sentAtTimestamp = new Date(expense.spentAt).getTime();

        return (
          sentAtTimestamp >= fromTimestamp && sentAtTimestamp <= toTimestamp
        );
      });
    }

    if (categories) {
      expenses = expenses.filter((expense) => expense.category === categories);
    }

    if (userId) {
      expenses = expenses.filter(
        (expense) => expense.userId === Number(userId),
      );
    }

    return expenses;
  };

  createExpense = ({ userId, spentAt, title, amount, category, note }) => {
    const newExpense = {
      userId,
      spentAt,
      title,
      amount,
      category,
      note,
      id: this.expesnses.length + 1,
    };

    this.expesnses.push(newExpense);

    return newExpense;
  };

  deleteExpense = (id) => {
    const user = this.getExpenseByID(id);

    if (user) {
      const index = this.expesnses.findIndex(({ id: userID }) => userID === id);

      this.expesnses.splice(index, 1);
    }

    return user;
  };

  updateExpense = ({ id, ...fields }) => {
    const expense = this.getExpenseByID(id);

    if (expense) {
      Object.assign(expense, fields);
    }

    return expense;
  };
}

module.exports = ExpensesService;
