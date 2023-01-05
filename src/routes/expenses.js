'use strict';

import * as expensesController from '../controllers/expences.js';
import express from 'express';

export const router = express.Router();

router.get('/', expensesController.getAll);
router.get('/:expenceId', expensesController.getOne);
router.get('/user/:userId', expensesController.getFromUser);
router.post('/', expensesController.add);
router.delete('/:expenceId', expensesController.remove);
router.patch('/:expenceId', expensesController.update);
