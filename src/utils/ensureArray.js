'use strict';

function ensureArray(value) {
  if (!value) {
    return [];
  }

  return Array.isArray(value) ? value : [value];
}

module.exports = {
  ensureArray,
};
