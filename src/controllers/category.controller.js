const categoryService = require('../services/category.service');

const BAD_REQUEST = 400;

const addNewCategory = async (req, res) => {
  const { name } = req.body;
  const { type, message } = await categoryService.addNewCategory(name);
  if (type === BAD_REQUEST) return res.status(type).json({ message });
  return res.status(type).json(message);
};

const getAllCategories = async (req, res) => {
  const { type, message } = await categoryService.getAllCategories();
  return res.status(type).json(message);
};

module.exports = {
  addNewCategory,
  getAllCategories,
};