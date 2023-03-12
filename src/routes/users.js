'use strict';

const express = require('express');
const userConroller = require('../controllers/users');

const router = express.Router();

router.get('/', userConroller.getAll);
router.get('/:userId', userConroller.getOne);
router.post('/', userConroller.add);
router.delete('/:userId', userConroller.remove);
router.patch('/:userId', userConroller.update);

module.exports = { router };
