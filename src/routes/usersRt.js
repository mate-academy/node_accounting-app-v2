'use strict';

const express = require('express');
const usersController = require('../controllers/usersCtrl');

const router = express.Router();

router.post('/', (req, res) => usersController.create(req, res));
router.get('/', (req, res) => usersController.getAll(req, res));
router.get('/:id', (req, res) => usersController.getById(req, res));
router.patch('/:id', (req, res) => usersController.update(req, res));
router.delete('/:id', (req, res) => usersController.delete(req, res));

module.exports = router;
