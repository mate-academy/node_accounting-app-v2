'use strict';

class GenerateId {
  constructor(lastId) {
    this.lastId = lastId;
    this.freeIds = [];
  }

  getId() {
    if (this.freeIds.length > 0) {
      return this.freeIds.shift();
    }

    this.lastId++;

    return this.lastId;
  }

  addFreeId(id) {
    this.freeIds.push(id);
  }
};

module.exports = {
  GenerateId,
};
