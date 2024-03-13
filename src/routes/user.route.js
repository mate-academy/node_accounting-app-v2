'use strict';

const express = require('express');
const userControllers = require('../controllers/user.controllers.js');

const { get, getOne, create, remove, update } = userControllers;

const router = express.Router();

router.get('/', get);
router.get('/:id', getOne);
router.post('/', create);
router.delete('/:id', remove);
router.patch('/:id', update);

module.exports = router;
