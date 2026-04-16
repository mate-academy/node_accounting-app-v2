const express = require('express');
const userControler = require('../controlers/usersConroler.js');

const router = express.Router();

router.get('/', userControler.getAll);

router.get('/:id', userControler.getOne);

router.post('/', userControler.create);

router.delete('/:id', userControler.remove);

router.patch('/:id', userControler.update);

module.exports = { router };
