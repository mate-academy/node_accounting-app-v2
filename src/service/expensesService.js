class Expenses {
  static count = 0;

  constructor() {
    this.expenses = [];
  }

  getAll(queryParams) {
    let localeCopy = [...this.expenses];

    if (!queryParams) {
      return Array.isArray(this.expenses) ? this.expenses : [];
    }

    const { userId, categories: cats, from, to } = queryParams;

    if (userId) {
      localeCopy = localeCopy.filter(
        (ex) => Number(ex.userId) === Number(userId),
      );
    }

    let normalCats = cats;

    if (!Array.isArray(cats)) {
      if (typeof cats === 'string') {
        normalCats = cats
          .split(',')
          .map((c) => c.trim())
          .filter(Boolean);
      } else {
        normalCats = [];
      }
    }

    if (normalCats?.length) {
      localeCopy = localeCopy.filter((ex) => normalCats.includes(ex.category));
    }

    if (from) {
      const fromDate = new Date(from);

      if (!isNaN(fromDate)) {
        localeCopy = localeCopy.filter(
          (ex) => new Date(ex.spentAt) >= fromDate,
        );
      }
    }

    if (to) {
      const toDate = new Date(to);

      if (!isNaN(toDate)) {
        localeCopy = localeCopy.filter((ex) => new Date(ex.spentAt) <= toDate);
      }
    }

    return localeCopy;
  }

  getById(expId) {
    if (this.expenses.length === 0) {
      return null;
    }

    const result = this.expenses.find((ex) => Number(ex.id) === Number(expId));

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

    this.expenses = this.expenses.filter(
      (ex) => Number(ex.id) !== Number(expId),
    );

    return true;
  }
}

module.exports = Expenses;
