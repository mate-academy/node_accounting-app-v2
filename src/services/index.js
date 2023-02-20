/* eslint-disable space-before-function-paren */
/* eslint-disable no-console */
'use strict';

const Sequelize = require('sequelize');

const sequelize = new Sequelize('sqlite::memory:');

const initilizeDB = async () => {
  try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
};

exports.initilizeDB = initilizeDB;
exports.sequelize = sequelize;
