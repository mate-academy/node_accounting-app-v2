'use strict';

const userControllers = require('../controllers/users');
const express = require('express');

const router = express.Router();

router.use(express.json());
router.get('/', userControllers.getAll);
router.get('/:userId', userControllers.getById);
router.post('/', userControllers.create);
router.delete('/:userId', userControllers.remove);
router.patch('/:userId', userControllers.edit);

module.exports = router;
