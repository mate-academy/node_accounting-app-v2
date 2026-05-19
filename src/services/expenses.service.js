'use strict';

const { getUserById } = require('./users.service.js');

const expensesById = new Map();

/** Next assignable id. */
let nextId = 1;

/** For tests — clear between runs so suites don’t share state. */
function resetExpensesStore() {
  expensesById.clear();
  nextId = 1;
}

function parseId(raw) {
  const id = typeof raw === 'string' ? Number(raw) : raw;

  return Number.isInteger(id) && id >= 1 ? id : null;
}

/**
 * @param {Record<string, unknown>} query
 * @returns {Array<{ id: number } & Record<string, unknown>> | null}
 */
function getExpenses(query) {
  const present = (key) => {
    const v = query[key];

    return v !== undefined && v !== null && v !== '';
  };

  const toMs = (raw) => {
    if (raw === undefined || raw === null || raw === '') {
      return null;
    }

    const ms = Date.parse(String(raw));

    return Number.isNaN(ms) ? null : ms;
  };

  if (present('userId')) {
    if (!getUserById(query.userId)) {
      return null;
    }
  }

  const userId = present('userId') ? parseId(query.userId) : null;
  const fromMs = toMs(query.from);
  const toEndMs = toMs(query.to);

  let categorySet = null;

  if (present('categories')) {
    categorySet = new Set(
      String(query.categories)
        .split(',')
        .map((s) => s.trim())
        .filter(Boolean),
    );
  }

  return Array.from(expensesById.entries())
    .filter(([, data]) => {
      if (userId !== null && data.userId !== userId) {
        return false;
      }

      if (fromMs !== null || toEndMs !== null) {
        const spentMs = toMs(data.spentAt);

        if (spentMs === null) {
          return false;
        }

        if (fromMs !== null && spentMs < fromMs) {
          return false;
        }

        if (toEndMs !== null && spentMs > toEndMs) {
          return false;
        }
      }

      if (categorySet !== null && categorySet.size > 0) {
        if (!categorySet.has(String(data.category))) {
          return false;
        }
      }

      return true;
    })
    .map(([id, data]) => ({
      id,
      ...data,
    }));
}

function getExpensesById(rawId) {
  const id = parseId(rawId);

  if (id === null || !expensesById.has(id)) {
    return null;
  }

  return { id, ...expensesById.get(id) };
}

function creatEexpenses(payload) {
  if (!getUserById(payload.userId)) {
    return null;
  }

  const id = nextId++;

  expensesById.set(id, { ...payload });

  return getExpensesById(id);
}

function updatEexpenses(rawId, payload) {
  const id = parseId(rawId);

  if (id === null || !expensesById.has(id)) {
    return null;
  }

  const merged = { ...expensesById.get(id), ...payload };

  expensesById.set(id, merged);

  return getExpensesById(id);
}

/** @returns {{ id: number } & Record<string, unknown>} | null */
function deletEexpenses(rawId) {
  const id = parseId(rawId);

  if (id === null || !expensesById.has(id)) {
    return null;
  }

  const removed = getExpensesById(id);

  expensesById.delete(id);

  return removed;
}

module.exports = {
  resetExpensesStore,
  getExpenses,
  getExpensesById,
  creatEexpenses,
  updatEexpenses,
  deletEexpenses,
};
