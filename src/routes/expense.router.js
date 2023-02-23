'use strict';

const express = require('express');
const { expenseController } = require('../controllers/expense.controller.js');

const expenseRouter = express.Router();

module.exports = { expenseRouter };
