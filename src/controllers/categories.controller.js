const categoryService = require('../services/categories.service.js');

const get = (req, res) => {
  res.status(200).send(categoryService.getCategories());
};

const getById = (req, res) => {
  const { id } = req.params;
  const category = categoryService.getCategory(+id);

  if (!category) {
    return res.status(404).send({ message: 'Category not found' });
  }

  res.status(200).send(category);
};

const create = (req, res) => {
  const { name } = req.body;

  if (!name || typeof name !== 'string') {
    return res.status(400).send({ message: 'Invalid data' });
  }

  const newCategory = categoryService.createCategory(name);

  res.status(201).send(newCategory);
};

const remove = (req, res) => {
  const { id } = req.params;

  if (!categoryService.getCategory(+id)) {
    return res.status(404).send({ message: 'Category not found' });
  }
  categoryService.deleteCategory(+id);
  res.status(204).send();
};

const update = (req, res) => {
  const { id } = req.params;
  const { name } = req.body;

  const category = categoryService.getCategory(+id);

  if (!category) {
    return res.status(404).send({ message: 'Category not found' });
  }

  if (typeof name !== 'string' || !name) {
    return res.status(400).send({ message: 'Invalid data' });
  }

  const categoryToUpdate = categoryService.updateCategory({ id: +id, name });

  res.status(200).send(categoryToUpdate);
};

module.exports = {
  get,
  getById,
  create,
  remove,
  update,
};
