let expenses = [];

module.exports = {
  getAllFiltered({ userId, categories, from, to }) {
    const fromDateTime = new Date(from)?.getTime();
    const toDateTime = new Date(to)?.getTime();

    return expenses.filter((expense) => {
      if (userId && expense.userId !== userId) {
        return false;
      }

      if (categories && !categories.includes(expense.category)) {
        return false;
      }

      const spentAtDateTime = new Date(expense.spentAt).getTime();

      if (fromDateTime && fromDateTime > spentAtDateTime) {
        return false;
      }

      if (toDateTime && toDateTime < spentAtDateTime) {
        return false;
      }

      return true;
    });
  },
  getById(id) {
    return expenses.find((expense) => expense.id === id);
  },
  create({ userId, spentAt, title, amount, category, note }) {
    const id = (expenses[expenses.length - 1]?.id ?? 0) + 1;

    const newExpense = {
      id,
      userId,
      spentAt,
      title,
      amount,
      category,
      note,
    };

    expenses.push(newExpense);

    return newExpense;
  },
  update({ currentId, id, userId, spentAt, title, amount, category, note }) {
    const foundExpense = this.getById(currentId);

    Object.assign(foundExpense, {
      id: id ?? foundExpense.id,
      userId: userId ?? foundExpense.userId,
      spentAt: spentAt ?? foundExpense.spentAt,
      title: title ?? foundExpense.title,
      amount: amount ?? foundExpense.amount,
      category: category ?? foundExpense.category,
      note: note ?? foundExpense.note,
    });

    return foundExpense;
  },
  remove(id) {
    expenses = expenses.filter((expense) => expense.id !== id);
  },
  removeAll() {
    expenses.length = 0;
  },
};
