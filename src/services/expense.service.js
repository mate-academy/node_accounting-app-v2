function ExpenseService(store) {
  function getAll({ userId, from, to, categories } = {}) {
    const hasCategoryFilter = categories !== undefined && categories.length > 0;

    if (
      userId === undefined &&
      from === undefined &&
      to === undefined &&
      !hasCategoryFilter
    ) {
      return [...store.expenses];
    }

    let list = [...store.expenses];

    if (userId !== undefined) {
      list = list.filter((e) => e.userId === userId);
    }

    if (from !== undefined) {
      const fromTime = Date.parse(from);

      list = list.filter((e) => Date.parse(e.spentAt) >= fromTime);
    }

    if (to !== undefined) {
      const toTime = Date.parse(to);

      list = list.filter((e) => Date.parse(e.spentAt) <= toTime);
    }

    if (hasCategoryFilter) {
      const set = new Set(categories);

      list = list.filter((e) => set.has(e.category));
    }

    return list;
  }

  function getById(id) {
    return store.expenses.find((e) => e.id === id);
  }

  function create(payload) {
    const expense = {
      id: store.nextExpensesId++,
      userId: payload.userId,
      spentAt: payload.spentAt,
      title: payload.title,
      amount: payload.amount,
      category: payload.category,
      note: payload.note,
    };

    store.expenses.push(expense);

    return expense;
  }

  function patch(updates, id) {
    const expense = getById(id);

    if (!expense) {
      return null;
    }

    Object.assign(expense, updates);

    return expense;
  }

  function remove(id) {
    const before = store.expenses.length;

    store.expenses = store.expenses.filter((e) => e.id !== id);

    return store.expenses.length < before;
  }

  return {
    getAll,
    getById,
    create,
    patch,
    remove,
  };
}

module.exports = { ExpenseService };
