const User = require('./user.model');

class Expenses {
  /**
   * @type {number}
   */
  id;

  /**
   * @type {number}
   */
  userId;

  /**
   * @type {Date}
   */
  spentAt;

  /**
   * @type {string}
   */
  title;

  /**
   * @type {number}
   */
  amount;

  /**
   * @type {string}
   */
  category;

  /**
   * @type {string}
   */
  note;

  /**
   * @type {number}
   */
  userId;

  /**
   * @param {number} id
   * @param {string} name
   * @param {Date} spentAt
   * @param {string} title
   * @param {number} amount
   * @param {number} userId
   * @param {string} category
   * @param {string} note
   */
  constructor(
    id,
    name,
    spentAt = new Date(),
    title,
    amount,
    category,
    note,
    userId,
  ) {
    this._id = id;
    this._name = name;
    this._spentAt = spentAt;
    this._title = title;
    this._amount = amount;
    this._category = category;
    this._note = note;
    this._userId = userId;
  }

  get id() {
    return this._id;
  }

  get name() {
    return this._name;
  }

  get spentAt() {
    return this._spentAt;
  }

  get amount() {
    return this._amount;
  }

  get title() {
    return this._title;
  }

  get category() {
    return this._category;
  }

  get note() {
    return this._note;
  }

  get userId() {
    return this._userId;
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

  /**
   * @param {string} newTitle
   */
  set title(newTitle) {
    this._title = newTitle;
  }

  /**
   * @param {number} newAmount
   */
  set amount(newAmount) {
    this._amount = newAmount;
  }

  /**
   * @param {string} newCategory
   */
  set category(newCategory) {
    this._category = newCategory;
  }

  /**
   * @param {string} newNote
   */
  set note(newNote) {
    this._note = newNote;
  }

  /**
   *_
   * @param {User} user
   */
  setUser(user) {
    if (user instanceof User) {
      this._user = user;
      this._userId = user.getId();
    } else {
      throw new Error('user must be an instance of User');
    }
  }
}

module.exports = Expenses;
