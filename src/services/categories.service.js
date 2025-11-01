let categories = [];

const getCategories = () => {
  return categories;
};

const getCategory = (id) => {
  return categories.find((category) => category.id === +id) || null;
};

const createCategory = (name) => {
  const newCategory = {
    id: Math.max(0, ...categories.map((category) => category.id)) + 1,
    name,
  };

  categories.push(newCategory);

  return newCategory;
};

const deleteCategory = (id) => {
  categories = categories.filter((category) => category.id !== +id);
};

const updateCategory = ({ id, name }) => {
  const categoryToUpdate = getCategory(+id);

  if (!categoryToUpdate) {
    return null;
  }

  Object.assign(categoryToUpdate, { name });

  return categoryToUpdate;
};

const resetCategories = () => {
  categories = [];
};

module.exports = {
  updateCategory,
  deleteCategory,
  createCategory,
  getCategory,
  getCategories,
  resetCategories,
};
