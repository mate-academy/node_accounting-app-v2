'use strict';

const express = require('express');
const expencesController = require('../controllers/expences');
const router = express.Router();

router.post('/', expencesController.add);
router.get('/', expencesController.getAll);
router.get('/:expenceId', expencesController.getSingle);
router.patch('/:expenceId', expencesController.update);
router.delete('/:expenceId', expencesController.remove);

module.exports = expencesRouter;