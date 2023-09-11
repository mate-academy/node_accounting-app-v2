'use strict';

const Services = require('../services/Services');

class UserServices extends Services {
  create(name) {
    const newItem = {
      id: this.newItemId++,
      name,
    };

    this.arrOfItems.push(newItem);

    return newItem;
  }
}

const userServices = new UserServices();

module.exports = userServices;
