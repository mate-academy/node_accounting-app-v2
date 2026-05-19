'use strict';

/**
 * In-memory fake DB: id → user fields (id not duplicated in value).
 */
const usersById = new Map();

/** Next assignable id. */
let nextId = 1;

/** For tests — clear between runs so suites don’t share state. */
function resetUsersStore() {
  usersById.clear();
  nextId = 1;
}

function parseId(raw) {
  const id = typeof raw === 'string' ? Number(raw) : raw;

  return Number.isInteger(id) && id >= 1 ? id : null;
}

function getUsers() {
  return Array.from(usersById.entries()).map(([id, data]) => ({ id, ...data }));
}

function getUserById(rawId) {
  const id = parseId(rawId);

  if (id === null || !usersById.has(id)) {
    return null;
  }

  return { id, ...usersById.get(id) };
}

function createUser(payload) {
  const id = nextId++;

  usersById.set(id, { ...payload });

  return getUserById(id);
}

function updateUser(rawId, payload) {
  const id = parseId(rawId);

  if (id === null || !usersById.has(id)) {
    return null;
  }

  const merged = { ...usersById.get(id), ...payload };

  usersById.set(id, merged);

  return getUserById(id);
}

/** @returns {{ id: number } & Record<string, unknown>} | null */
function deleteUser(rawId) {
  const id = parseId(rawId);

  if (id === null || !usersById.has(id)) {
    return null;
  }

  const removed = getUserById(id);

  usersById.delete(id);

  return removed;
}

module.exports = {
  resetUsersStore,
  getUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
};
