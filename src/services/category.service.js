const Joi = require('joi');

const { Category } = require('../models');

const OK = 200;
const CREATED = 201;
const BAD_REQUEST = 400;

const addNewCategory = async (name) => {
  const schema = Joi.object({
    name: Joi.string().required(),
  });

  const { error } = schema.validate({ name });
  if (error) return { type: BAD_REQUEST, message: error.message };
  const newCategory = await Category.create({ name });
  return { type: CREATED, message: newCategory };
};

const getAllCategories = async () => {
  const allCategories = await Category.findAll();
  return { type: OK, message: allCategories };
};

module.exports = {
  addNewCategory,
  getAllCategories,
};