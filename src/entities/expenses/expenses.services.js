class ExpensesService {
  constructor() {
    this.expenses = [];
    this.nextId = 1;
  }

  getExpenseByID = (id) => {
    return this.expenses.find(({ id: userID }) => userID === id);
  };

  getAllExpenses = ({ categories, userId, from, to } = {}) => {
    let expenses = this.expenses;

    if (from && !to) {
      expenses = expenses.filter((expense) => {
        const fromTimestamp = new Date(from).getTime();
        const sentAtTimestamp = new Date(expense.spentAt).getTime();

        return sentAtTimestamp >= fromTimestamp;
      });
    }

    if (to && !from) {
      expenses = expenses.filter((expense) => {
        const toTimestamp = new Date(to).getTime();
        const sentAtTimestamp = new Date(expense.spentAt).getTime();

        return sentAtTimestamp <= toTimestamp;
      });
    }

    if (from && to) {
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
      expenses = expenses.filter((expense) =>
        categories.includes(expense.category),
      ); // eslint-disable-line
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
      id: this.nextId++,
    };

    this.expenses.push(newExpense);

    return newExpense;
  };

  deleteExpense = (id) => {
    const expense = this.getExpenseByID(id);

    if (expense) {
      const index = this.expenses.findIndex(
        ({ id: expenseID }) => expenseID === id,
      );

      this.expenses.splice(index, 1);
    }

    return expense;
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
