// eslint-disable-next-line no-unused-vars
const { Expenses } = require('./expenses.model');

class User {
  /**
   * @type {number}
   */
  id;

  /**
   * @type {string}
   */
  name;

  /**
   * @type {Expenses[]}
   */
  expenses;

  /**
   * @param {number} id
   * @param {string} name
   * @param {Expenses} expenses
   */
  constructor(id, name, expenses) {
    this._id = id;
    this._name = name;
    this._expenses = expenses;
  }

  get id() {
    return this._id;
  }

  get name() {
    return this._name;
  }

  get expenses() {
    return this._expenses;
  }

  /**
   * @param {number} newId
   */
  set id(newId) {
    this._id = newId;
  }

  /**
   * @param {string} newName
   */
  set name(newName) {
    this._name = newName;
  }
}

module.exports = User;
