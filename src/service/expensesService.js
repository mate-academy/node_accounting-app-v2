class Expenses {
  static count = 0;

  constructor() {
    this.expenses = [];
  }

  getAll(queryParams) {
    if (!queryParams) {
      return Array.isArray(this.expenses) ? this.expenses : [];
    }

    const { userId, categories: cats, from, to } = queryParams;

    if (userId) {
      this.expenses = this.expenses.filter(
        (ex) => Number(ex.userId) === Number(userId),
      );
    }

    if (cats?.length) {
      this.expenses = this.expenses.filter((ex) => cats.includes(ex.category));
    }

    if (from) {
      const fromDate = new Date(from);

      this.expenses = this.expenses.filter(
        (ex) => new Date(ex.spentAt) >= fromDate,
      );
    }

    if (to) {
      const toDate = new Date(to);

      this.expenses = this.expenses.filter(
        (ex) => new Date(ex.spentAt) <= toDate,
      );
    }

    return this.expenses;
  }

  getById(expId) {
    if (this.expenses.length === 0) {
      return null;
    }

    const result = this.expenses.find((ex) => Number(ex.id) === expId);

    return result || null;
  }

  addExpense(content) {
    const { userId, spentAt, title, amount, category, note } = content;

    const newExpense = {
      id: Expenses.count,
      userId,
      spentAt,
      title,
      amount,
      category,
      note: note ?? '',
    };

    this.expenses.push(newExpense);

    Expenses.count++;

    return newExpense;
  }

  updExpense(expId, content) {
    const expense = this.getById(expId);

    if (!expense) {
      return null;
    }

    Object.assign(expense, content);

    return expense;
  }

  deleteExp(expId) {
    const isExist = this.getById(expId);

    if (!isExist) {
      return null;
    }

    this.expenses = this.expenses.filter((ex) => ex.id !== expId);

    return true;
  }
}

module.exports = Expenses;
