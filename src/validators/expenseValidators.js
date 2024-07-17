const { getUserById } = require('../services/users.service');

function isValidUserId(userId) {
  return typeof userId === 'number' && getUserById(userId);
}

function isValidDate(dateString) {
  return !isNaN(new Date(dateString));
}

function isNonEmptyString(value) {
  return typeof value === 'string' && value.trim() !== '';
}

function isValidNumber(value) {
  return typeof value === 'number';
}

function isValidNote(note) {
  return typeof note === 'string' || typeof note === 'undefined';
}

function isValidDateOrUndefined(date) {
  return !isNaN(new Date(date)) || typeof date === 'undefined';
}

function isNonEmptyStringOrUndefined(str) {
  return (
    (typeof str === 'string' && str.trim() !== '') || typeof str === 'undefined'
  );
}

function isNumberOrUndefined(num) {
  return typeof num === 'number' || typeof num === 'undefined';
}

module.exports = {
  isValidUserId,
  isValidDate,
  isNonEmptyString,
  isValidNumber,
  isValidNote,
  isValidDateOrUndefined,
  isNonEmptyStringOrUndefined,
  isNumberOrUndefined,
};
