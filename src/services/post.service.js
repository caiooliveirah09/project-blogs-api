const Joi = require('joi');

const { BlogPost, PostCategory, sequelize } = require('../models');

const categoryService = require('./category.service');

// const OK = 200;
const CREATED = 201;
const BAD_REQUEST = 400;

const schema = Joi.object({
  title: Joi.string().required(), 
  content: Joi.string().required(),
  categoryIds: Joi.array().min(1).required(),
}).messages({ 
  'any.required': 'Some required fields are missing',
  'string.empty': 'Some required fields are missing',
  'array.empty': 'Some required fields are missing',
});

const addNewBlogPost = async (body, userId) => {
  const { error } = schema.validate(body);
  if (error) return { type: BAD_REQUEST, message: error.message };
  const bodyWithId = {
    ...body,
    userId,
    published: sequelize.literal('CURRENT_TIMESTAMP'),
    updated: sequelize.literal('CURRENT_TIMESTAMP'),
  };

  const { message } = await categoryService.getAllCategories();

  const allCategoriesId = message.map((category) => category.id);

  const existe = body.categoryIds.every((categoryId) => allCategoriesId.includes(categoryId));

  if (!existe) return { type: BAD_REQUEST, message: 'one or more "categoryIds" not found' };

  const { dataValues } = await BlogPost.create(bodyWithId);

  body.categoryIds.forEach(async (category) => {
    await PostCategory.create({ postId: dataValues.id, categoryId: category });
  });

  const newBlogPost = await BlogPost.findOne({ where: { id: dataValues.id } });

  return { type: CREATED, message: newBlogPost };
};

module.exports = {
  addNewBlogPost,
};