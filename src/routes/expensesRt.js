'use strict';

const express = require('express');
const expensesController = require('../controllers/expensesCtrl');

const router = express.Router();

router.post('/', (req, res) => expensesController.create(req, res));
router.get('/', (req, res) => expensesController.getAll(req, res));
router.get('/:id', (req, res) => expensesController.getById(req, res));
router.patch('/:id', (req, res) => expensesController.update(req, res));
router.delete('/:id', (req, res) => expensesController.delete(req, res));

module.exports = router;
