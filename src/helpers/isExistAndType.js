'use strict';

function isStr(value) {
  return !!(value) && typeof value === 'string';
}

function isNum(value) {
  return value !== null
    && value !== undefined
    && typeof value === 'number'
    && !Number.isNaN(value);
}

function isDate(value) {
  const date = new Date(value);

  return !Number.isNaN(date.getTime());
}

module.exports = { isStr, isNum, isDate };
