const expensesService = require('./expenses.service.js');
const usersService = require('../users/users.service.js');

const getAll = async (req, res) => {
    const expenses = await expensesService.getAll(req.query);

    res.json(expenses);
};

const getOne = async (req, res) => {
    const expense = await expensesService.getById(req.params.id);

    if (!expense) {
        return res.sendStatus(404);
    }

    res.json(expense);
};

const create = async (req, res) => {
    const { title, amount, category, userId, spentAt, note } = req.body;
    const user = await usersService.getById(userId);

    if (!isValidParams(req.body)) {
        return res.sendStatus(400);
    }

    if (!user) {
        return res.sendStatus(400);
    }

    const expense = await expensesService.create({
        userId,
        spentAt,
        title,
        amount,
        category,
        note,
    });

    res.status(201).json(expense);
};

const deleteOne = async (req, res) => {
    const expense = await expensesService.getById(req.params.id);

    if (!expense) {
        return res.sendStatus(404);
    }

    await expensesService.deleteById(req.params.id);

    res.sendStatus(204);
};

const update = async (req, res) => {
    const expense = await expensesService.getById(req.params.id);

    if (!expense) {
        return res.sendStatus(404);
    }

    if (!req.body || !isValidParams(req.body, true)) {
        return res.sendStatus(400);
    }

    if (req.body.userId) {
        const user = await usersService.getById(req.body.userId);

        if (!user) {
            return res.sendStatus(400);
        }
    }

    const updatedExpense = await expensesService.update(req.params.id, req.body);

    res.json(updatedExpense);
};

const isValidParams = (params, isUpdate = false) => {
    if (!params) return false;

    const { title, amount, category, userId, spentAt, note } = params;

    if (isUpdate) {
        return Boolean(title || amount || category || userId || spentAt || note);
    }

    return Boolean(title && amount && category && userId && spentAt && note);
};

module.exports = {
    getAll,
    getOne,
    create,
    deleteOne,
    update,
};
