'use strict';

const dotenv = require('dotenv');
const { Sequelize } = require('sequelize');

dotenv.config();

// const { DB_HOST, DB_PASS, DB_NAME } = process.env;
const DB_NAME = 'ckabyrih';
const DB_HOST = 'mel.db.elephantsql.com';
const DB_PASS = 'ziYsThk6wL-qOetlpigtbjenUywImZ9H';

if (!DB_HOST || !DB_PASS || !DB_NAME) {
  throw new Error('Missing DB config');
}

const db = new Sequelize(DB_NAME, 'ckabyrih', DB_PASS, {
  host: DB_HOST,
  dialect: 'postgres',
});

module.exports = {
  db,
};
